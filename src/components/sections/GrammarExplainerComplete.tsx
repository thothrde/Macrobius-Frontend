            <TabsContent value="analyze">
              <div className="space-y-6">
                <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                  <CardHeader>
                    <CardTitle className="text-white">Text Analysis</CardTitle>
                    <CardDescription className="text-white/70">
                      {t.labels.selectText}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Enter Latin text to analyze:
                        </label>
                        <textarea
                          value={selectedText}
                          onChange={(e) => setSelectedText(e.target.value)}
                          placeholder="Convivae discubuere in triclinio..."
                          className="w-full px-4 py-3 bg-white/20 border border-gold/30 rounded text-white placeholder-white/60 h-24"
                          disabled={backendStatus !== 'connected'}
                        />
                      </div>
                      <Button
                        onClick={() => analyzeSelectedText(selectedText)}
                        disabled={!selectedText.trim() || loading}
                        className="bg-wine-red hover:bg-wine-red/80 text-gold"
                      >
                        <Search className="w-4 h-4 mr-2" />
                        {t.actions.analyzeText}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {analysisResult && (
                  <Card className="bg-white border border-gold/30">
                    <CardHeader>
                      <CardTitle>{t.labels.analysisResult}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Word Analysis:</h4>
                          <div className="grid gap-2">
                            {analysisResult.words.map((word, wordIdx) => (
                              <div key={wordIdx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <span className="font-medium">{word.word}</span>
                                <div className="flex space-x-2">
                                  <Badge variant="outline">{word.part_of_speech}</Badge>
                                  <Badge variant="outline">{word.case}</Badge>
                                  <Badge variant="outline">{word.number}</Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Structure Analysis:</h4>
                          <p className="text-gray-700">{analysisResult.overall_structure}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Suggestions:</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {analysisResult.suggestions.map((suggestion, suggestionIdx) => (
                              <li key={suggestionIdx} className="text-sm text-gray-600">{suggestion}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="explore">
              <Card className="bg-white/10 backdrop-blur-sm border border-gold/30">
                <CardContent className="text-center py-12">
                  <Scroll className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Explore Grammar Patterns</h3>
                  <p className="text-white/70 mb-4">
                    Discover grammatical patterns across the complete Macrobius corpus
                  </p>
                  {grammarStats && (
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
                      {Object.entries(grammarStats.category_distribution).map(([category, count]) => (
                        <div key={category} className="bg-black/20 p-3 rounded">
                          <div className="text-2xl font-bold text-gold">{count}</div>
                          <div className="text-sm text-white/70 capitalize">{category}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-center space-x-4">
                    <Button 
                      onClick={() => setCurrentMode('patterns')}
                      className="bg-wine-red hover:bg-wine-red/80 text-gold"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      {t.actions.findPatterns}
                    </Button>
                    <Button 
                      onClick={() => setCurrentMode('exercises')}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Practice Exercises
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="exercises">
              {renderExerciseInterface()}
            </TabsContent>
            
            <TabsContent value="patterns">
              {renderPatternInterface()}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default GrammarExplainerSection;