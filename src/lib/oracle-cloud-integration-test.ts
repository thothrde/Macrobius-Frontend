// Oracle Cloud Integration Test
// Verifies connection to Oracle Cloud backend with 1,401 Macrobius passages

import { macrobiusApi } from '../utils/macrobiusApi';

interface TestResult {
  testName: string;
  status: 'PASS' | 'FAIL' | 'PENDING';
  message: string;
  data?: any;
}

class OracleCloudIntegrationTest {
  private results: TestResult[] = [];

  async runAllTests(): Promise<TestResult[]> {
    console.log('🔌 Starting Oracle Cloud Integration Tests...\n');

    // Test 1: Basic connection
    await this.testBasicConnection();
    
    // Test 2: Passage search
    await this.testPassageSearch();
    
    // Test 3: Vocabulary loading
    await this.testVocabularyLoading();
    
    // Test 4: Cultural themes analysis
    await this.testCulturalThemesAnalysis();
    
    // Test 5: Corpus statistics
    await this.testCorpusStatistics();

    return this.results;
  }

  private async testBasicConnection(): Promise<void> {
    const test: TestResult = {
      testName: 'Oracle Cloud Connection',
      status: 'PENDING',
      message: 'Testing basic connection to Oracle Cloud backend...'
    };

    try {
      const isConnected = await macrobiusApi.testConnection();
      
      if (isConnected) {
        test.status = 'PASS';
        test.message = '✅ Successfully connected to Oracle Cloud backend';
      } else {
        test.status = 'FAIL';
        test.message = '❌ Failed to connect to Oracle Cloud backend';
      }
    } catch (error) {
      test.status = 'FAIL';
      test.message = `❌ Connection error: ${error}`;
    }

    this.results.push(test);
  }

  private async testPassageSearch(): Promise<void> {
    const test: TestResult = {
      testName: 'Passage Search',
      status: 'PENDING',
      message: 'Testing passage search functionality...'
    };

    try {
      const searchResults = await macrobiusApi.searchPassages('Saturni', 'Astronomy', 5);
      
      if (searchResults.passages && searchResults.passages.length > 0) {
        test.status = 'PASS';
        test.message = `✅ Found ${searchResults.passages.length} passages (Total: ${searchResults.total_count})`;
        test.data = {
          passageCount: searchResults.passages.length,
          totalCount: searchResults.total_count,
          firstPassage: searchResults.passages[0]?.latin_text?.substring(0, 100) + '...'
        };
      } else {
        test.status = 'FAIL';
        test.message = '❌ No passages found in search results';
      }
    } catch (error) {
      test.status = 'FAIL';
      test.message = `❌ Passage search error: ${error}`;
    }

    this.results.push(test);
  }

  private async testVocabularyLoading(): Promise<void> {
    const test: TestResult = {
      testName: 'Vocabulary Loading',
      status: 'PENDING',
      message: 'Testing vocabulary word loading...'
    };

    try {
      const vocabulary = await macrobiusApi.getVocabulary('Intermediate', 'Philosophy', 10);
      
      if (vocabulary && vocabulary.length > 0) {
        test.status = 'PASS';
        test.message = `✅ Loaded ${vocabulary.length} vocabulary words`;
        test.data = {
          wordCount: vocabulary.length,
          sampleWords: vocabulary.slice(0, 3).map(w => ({
            word: w.latin_word,
            definition: w.english_meaning?.substring(0, 50) + '...',
            frequency: w.frequency
          }))
        };
      } else {
        test.status = 'FAIL';
        test.message = '❌ No vocabulary words loaded';
      }
    } catch (error) {
      test.status = 'FAIL';
      test.message = `❌ Vocabulary loading error: ${error}`;
    }

    this.results.push(test);
  }

  private async testCulturalThemesAnalysis(): Promise<void> {
    const test: TestResult = {
      testName: 'Cultural Themes Analysis',
      status: 'PENDING',
      message: 'Testing cultural themes analysis...'
    };

    try {
      const themesAnalysis = await macrobiusApi.getCulturalThemesAnalysis();
      
      if (themesAnalysis.themes && themesAnalysis.themes.length > 0) {
        test.status = 'PASS';
        test.message = `✅ Analyzed ${themesAnalysis.themes.length} cultural themes`;
        test.data = {
          totalPassages: themesAnalysis.total_passages,
          themeCount: themesAnalysis.themes.length,
          topThemes: themesAnalysis.themes
            .sort((a, b) => b.passage_count - a.passage_count)
            .slice(0, 3)
            .map(t => ({
              name: t.name,
              passages: t.passage_count,
              percentage: t.percentage
            }))
        };
      } else {
        test.status = 'FAIL';
        test.message = '❌ No cultural themes found';
      }
    } catch (error) {
      test.status = 'FAIL';
      test.message = `❌ Cultural themes analysis error: ${error}`;
    }

    this.results.push(test);
  }

  private async testCorpusStatistics(): Promise<void> {
    const test: TestResult = {
      testName: 'Corpus Statistics',
      status: 'PENDING',
      message: 'Testing corpus statistics loading...'
    };

    try {
      const stats = await macrobiusApi.getCorpusStatistics();
      
      if (stats) {
        test.status = 'PASS';
        test.message = '✅ Successfully loaded corpus statistics';
        test.data = {
          totalPassages: stats.total_passages || 'N/A',
          totalWords: stats.total_words || 'N/A',
          averagePassageLength: stats.average_passage_length || 'N/A',
          workTypes: stats.work_types || {}
        };
      } else {
        test.status = 'FAIL';
        test.message = '❌ No corpus statistics available';
      }
    } catch (error) {
      test.status = 'FAIL';
      test.message = `❌ Corpus statistics error: ${error}`;
    }

    this.results.push(test);
  }

  generateReport(): string {
    const passedTests = this.results.filter(r => r.status === 'PASS').length;
    const failedTests = this.results.filter(r => r.status === 'FAIL').length;
    const totalTests = this.results.length;

    let report = `
# 🔌 ORACLE CLOUD INTEGRATION TEST REPORT
## Generated: ${new Date().toISOString()}

### 📊 SUMMARY
- **Total Tests**: ${totalTests}
- **Passed**: ${passedTests} ✅
- **Failed**: ${failedTests} ${failedTests > 0 ? '❌' : '✅'}
- **Success Rate**: ${Math.round((passedTests / totalTests) * 100)}%

### 📋 DETAILED RESULTS

`;

    this.results.forEach((result, index) => {
      report += `
#### ${index + 1}. ${result.testName} - ${result.status}
**Message:** ${result.message}

`;

      if (result.data) {
        report += `**Data:**
\`\`\`json
${JSON.stringify(result.data, null, 2)}
\`\`\`

`;
      }
    });

    report += `
### 🎯 INTEGRATION STATUS
${passedTests === totalTests ? 
  '🎉 **ALL TESTS PASSED** - Oracle Cloud integration is fully operational!' :
  `⚠️ **${failedTests} TEST(S) FAILED** - Please check Oracle Cloud backend status.`
}

### 🏛️ EXPECTED ORACLE CLOUD DATA
- **Total Passages**: 1,401 authentic Macrobius passages
- **Cultural Themes**: 9 major themes (Philosophy, Astronomy, Social Customs, etc.)
- **Teaching Modules**: 16 structured learning modules
- **Cultural Insights**: 16 ancient-modern connections
- **Corpus Size**: 235,237 characters of authentic Latin content

### 🔗 ORACLE CLOUD ENDPOINTS
- **Base URL**: http://152.70.184.232:8080
- **Health Check**: /api/health
- **Passages Search**: /api/passages/search
- **Vocabulary**: /api/vocabulary
- **Analytics**: /api/analytics/themes
- **Teaching**: /api/teaching/modules
- **Insights**: /api/insights

`;

    return report;
  }
}

// Export for use in testing
export { OracleCloudIntegrationTest };

// Usage example:
/*
const tester = new OracleCloudIntegrationTest();
const results = await tester.runAllTests();
const report = tester.generateReport();
console.log(report);
*/