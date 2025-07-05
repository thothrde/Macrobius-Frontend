#!/usr/bin/env node

/**
 * 🔍 PRE-DEPLOYMENT CHECK SCRIPT
 * Comprehensive checks before Vercel deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`)
};

const checks = {
  passed: 0,
  failed: 0,
  warnings: 0
};

function checkExists(filePath, description) {
  if (fs.existsSync(filePath)) {
    log.success(`${description} exists`);
    checks.passed++;
    return true;
  } else {
    log.error(`${description} missing: ${filePath}`);
    checks.failed++;
    return false;
  }
}

function checkFileContent(filePath, description, required = []) {
  if (!fs.existsSync(filePath)) {
    log.error(`${description} missing: ${filePath}`);
    checks.failed++;
    return false;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const missing = required.filter(req => !content.includes(req));
  
  if (missing.length === 0) {
    log.success(`${description} contains all required elements`);
    checks.passed++;
    return true;
  } else {
    log.warning(`${description} missing: ${missing.join(', ')}`);
    checks.warnings++;
    return false;
  }
}

function runCommand(command, description) {
  try {
    log.info(`Running: ${description}`);
    execSync(command, { stdio: 'pipe' });
    log.success(`${description} passed`);
    checks.passed++;
    return true;
  } catch (error) {
    log.error(`${description} failed: ${error.message}`);
    checks.failed++;
    return false;
  }
}

function checkPackageJson() {
  const packagePath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packagePath)) {
    log.error('package.json missing');
    checks.failed++;
    return false;
  }
  
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  // Check required scripts
  const requiredScripts = ['build', 'start', 'dev'];
  const missingScripts = requiredScripts.filter(script => !pkg.scripts[script]);
  
  if (missingScripts.length === 0) {
    log.success('package.json has all required scripts');
    checks.passed++;
  } else {
    log.error(`package.json missing scripts: ${missingScripts.join(', ')}`);
    checks.failed++;
  }
  
  // Check dependencies
  const requiredDeps = ['next', 'react', 'react-dom'];
  const missingDeps = requiredDeps.filter(dep => !pkg.dependencies[dep]);
  
  if (missingDeps.length === 0) {
    log.success('package.json has all required dependencies');
    checks.passed++;
  } else {
    log.error(`package.json missing dependencies: ${missingDeps.join(', ')}`);
    checks.failed++;
  }
  
  return missingScripts.length === 0 && missingDeps.length === 0;
}

function checkEnvironmentVariables() {
  const envPath = path.join(process.cwd(), '.env.production');
  if (!fs.existsSync(envPath)) {
    log.warning('.env.production file missing');
    checks.warnings++;
    return false;
  }
  
  const content = fs.readFileSync(envPath, 'utf8');
  const requiredVars = [
    'NEXT_PUBLIC_ORACLE_URL',
    'NEXT_PUBLIC_RAG_ENABLED',
    'NODE_ENV=production'
  ];
  
  const missing = requiredVars.filter(varName => !content.includes(varName));
  
  if (missing.length === 0) {
    log.success('.env.production has all required variables');
    checks.passed++;
    return true;
  } else {
    log.warning(`.env.production missing variables: ${missing.join(', ')}`);
    checks.warnings++;
    return false;
  }
}

function checkBuildFiles() {
  const buildPath = path.join(process.cwd(), '.next');
  if (fs.existsSync(buildPath)) {
    log.info('Removing existing build directory');
    fs.rmSync(buildPath, { recursive: true, force: true });
  }
  
  return runCommand('npm run build', 'Production build test');
}

function checkMobileExclusion() {
  const nextConfigPath = path.join(process.cwd(), 'next.config.js');
  if (!fs.existsSync(nextConfigPath)) {
    log.error('next.config.js missing');
    checks.failed++;
    return false;
  }
  
  const content = fs.readFileSync(nextConfigPath, 'utf8');
  if (content.includes('mobile\\//') || content.includes('ignore-loader')) {
    log.success('Mobile components excluded from build');
    checks.passed++;
    return true;
  } else {
    log.warning('Mobile components may not be excluded from build');
    checks.warnings++;
    return false;
  }
}

async function runAllChecks() {
  console.log('🔍 PRE-DEPLOYMENT CHECKS');
  console.log('========================');
  console.log('');
  
  log.info('Starting comprehensive pre-deployment checks...');
  console.log('');
  
  // Essential Files
  log.info('📁 Checking essential files...');
  checkExists('package.json', 'package.json');
  checkExists('next.config.js', 'next.config.js');
  checkExists('vercel.json', 'vercel.json');
  checkExists('.env.production', '.env.production');
  checkExists('tsconfig.json', 'tsconfig.json');
  console.log('');
  
  // Package.json validation
  log.info('📦 Validating package.json...');
  checkPackageJson();
  console.log('');
  
  // Environment variables
  log.info('🔧 Checking environment variables...');
  checkEnvironmentVariables();
  console.log('');
  
  // Vercel configuration
  log.info('⚡ Checking Vercel configuration...');
  checkFileContent(
    'vercel.json',
    'vercel.json',
    ['"version": 2', '"@vercel/next"', 'ki-rag-assistent']
  );
  console.log('');
  
  // Next.js configuration
  log.info('🔧 Checking Next.js configuration...');
  checkMobileExclusion();
  console.log('');
  
  // TypeScript check
  log.info('📘 Running TypeScript check...');
  runCommand('npx tsc --noEmit', 'TypeScript compilation check');
  console.log('');
  
  // Linting
  log.info('🧹 Running linting...');
  runCommand('npm run lint', 'ESLint check');
  console.log('');
  
  // Build test
  log.info('🏗️ Running build test...');
  checkBuildFiles();
  console.log('');
  
  // Oracle Cloud connection
  log.info('🔌 Testing Oracle Cloud connection...');
  runCommand('npm run oracle-test', 'Oracle Cloud connection test');
  console.log('');
  
  // Final summary
  console.log('📊 DEPLOYMENT READINESS SUMMARY');
  console.log('================================');
  console.log('');
  
  log.success(`Checks passed: ${checks.passed}`);
  if (checks.warnings > 0) {
    log.warning(`Warnings: ${checks.warnings}`);
  }
  if (checks.failed > 0) {
    log.error(`Checks failed: ${checks.failed}`);
  }
  console.log('');
  
  if (checks.failed === 0) {
    log.success('🎉 ALL CRITICAL CHECKS PASSED!');
    log.success('✅ Your Macrobius platform is ready for deployment');
    log.info('🚀 You can now run: npm run deploy');
    if (checks.warnings > 0) {
      log.warning(`⚠️  ${checks.warnings} warnings were found, but deployment can proceed`);
    }
    console.log('');
    process.exit(0);
  } else {
    log.error('❌ DEPLOYMENT NOT READY');
    log.error(`Please fix ${checks.failed} failed checks before deployment`);
    console.log('');
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  log.error(`Uncaught exception: ${err.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  log.error(`Unhandled rejection at ${promise}: ${reason}`);
  process.exit(1);
});

// Run all checks
runAllChecks().catch((err) => {
  log.error(`Check execution failed: ${err.message}`);
  process.exit(1);
});