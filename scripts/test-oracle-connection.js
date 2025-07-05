#!/usr/bin/env node

/**
 * 🔌 ORACLE CLOUD CONNECTION TEST SCRIPT
 * Tests the connection to the Oracle Cloud RAG backend
 */

const https = require('https');
const http = require('http');

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

const ORACLE_URL = process.env.NEXT_PUBLIC_ORACLE_URL || 'http://152.70.184.232:8082';
const TIMEOUT = 10000; // 10 seconds

function testConnection(url, endpoint = '') {
  return new Promise((resolve, reject) => {
    const fullUrl = `${url}${endpoint}`;
    const parsedUrl = new URL(fullUrl);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;
    
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.pathname,
      method: 'GET',
      timeout: TIMEOUT,
      headers: {
        'User-Agent': 'Macrobius-Test-Script/1.0'
      }
    };

    const req = protocol.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data,
          responseTime: Date.now() - startTime
        });
      });
    });

    const startTime = Date.now();
    
    req.on('error', (err) => {
      reject({
        error: err.message,
        code: err.code,
        responseTime: Date.now() - startTime
      });
    });

    req.on('timeout', () => {
      req.destroy();
      reject({
        error: 'Request timeout',
        code: 'TIMEOUT',
        responseTime: TIMEOUT
      });
    });

    req.end();
  });
}

function testChatEndpoint(url) {
  return new Promise((resolve, reject) => {
    const fullUrl = `${url}/api/chat`;
    const parsedUrl = new URL(fullUrl);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;
    
    const postData = JSON.stringify({
      query: 'Test connection'
    });
    
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.pathname,
      method: 'POST',
      timeout: TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Macrobius-Test-Script/1.0'
      }
    };

    const req = protocol.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data,
          responseTime: Date.now() - startTime
        });
      });
    });

    const startTime = Date.now();
    
    req.on('error', (err) => {
      reject({
        error: err.message,
        code: err.code,
        responseTime: Date.now() - startTime
      });
    });

    req.on('timeout', () => {
      req.destroy();
      reject({
        error: 'Request timeout',
        code: 'TIMEOUT',
        responseTime: TIMEOUT
      });
    });

    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('🔌 ORACLE CLOUD RAG CONNECTION TEST');
  console.log('==================================');
  console.log('');
  
  log.info(`Testing connection to: ${ORACLE_URL}`);
  console.log('');
  
  // Test 1: Basic connectivity
  log.info('Test 1: Basic connectivity...');
  try {
    const result = await testConnection(ORACLE_URL);
    log.success(`Connection successful (${result.responseTime}ms)`);
    log.info(`Status: ${result.statusCode}`);
  } catch (err) {
    log.error(`Connection failed: ${err.error}`);
    log.error(`Error code: ${err.code}`);
    log.error(`Time taken: ${err.responseTime}ms`);
    console.log('');
    log.error('❌ BASIC CONNECTION TEST FAILED');
    log.warning('RAG system will not be available');
    process.exit(1);
  }
  
  console.log('');
  
  // Test 2: Health endpoint
  log.info('Test 2: Health endpoint...');
  try {
    const result = await testConnection(ORACLE_URL, '/api/health');
    log.success(`Health check successful (${result.responseTime}ms)`);
    log.info(`Status: ${result.statusCode}`);
    if (result.data) {
      try {
        const healthData = JSON.parse(result.data);
        log.info(`Health status: ${JSON.stringify(healthData)}`);
      } catch (e) {
        log.info(`Health response: ${result.data.substring(0, 100)}...`);
      }
    }
  } catch (err) {
    log.warning(`Health check failed: ${err.error}`);
    log.warning(`This may be normal if /api/health endpoint doesn't exist`);
  }
  
  console.log('');
  
  // Test 3: Chat endpoint
  log.info('Test 3: Chat endpoint...');
  try {
    const result = await testChatEndpoint(ORACLE_URL);
    log.success(`Chat endpoint test successful (${result.responseTime}ms)`);
    log.info(`Status: ${result.statusCode}`);
    
    if (result.data) {
      try {
        const chatData = JSON.parse(result.data);
        log.success('Chat endpoint returns valid JSON');
        if (chatData.response) {
          log.success('Chat response received');
        }
        if (chatData.sources) {
          log.success(`Sources available: ${chatData.sources.length}`);
        }
      } catch (e) {
        log.warning('Chat endpoint response is not valid JSON');
        log.info(`Response: ${result.data.substring(0, 200)}...`);
      }
    }
  } catch (err) {
    log.error(`Chat endpoint test failed: ${err.error}`);
    log.error(`Error code: ${err.code}`);
    log.error(`Time taken: ${err.responseTime}ms`);
    console.log('');
    log.error('❌ CHAT ENDPOINT TEST FAILED');
    log.warning('RAG chat functionality will not work');
    process.exit(1);
  }
  
  console.log('');
  
  // Summary
  log.success('🎉 ALL ORACLE CLOUD TESTS PASSED!');
  log.success('✅ RAG system is ready for deployment');
  log.info('📋 Backend services are operational');
  log.info('🚀 Deployment can proceed');
  
  console.log('');
  console.log('📊 TEST SUMMARY:');
  console.log('================');
  console.log('✅ Basic connectivity: PASSED');
  console.log('✅ Health endpoint: TESTED');
  console.log('✅ Chat endpoint: PASSED');
  console.log('✅ RAG system: OPERATIONAL');
  console.log('');
  
  process.exit(0);
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

// Run tests
runTests().catch((err) => {
  log.error(`Test execution failed: ${err.message}`);
  process.exit(1);
});