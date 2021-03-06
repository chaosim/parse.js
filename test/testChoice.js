define(['parse/parse'],
function(parse){
    return {
        'module': "parse.choice",
        'tests': [
            ["Succeed",
            function(){
                var a = parse.choice(
                    parse.character('a'),
                    parse.character('b'),
                    parse.character('c'));
                
                assert.deepEqual(parse.run(a, "abc"), 'a');
                
                assert.deepEqual(parse.run(a, "bac"), 'b');
                
                assert.deepEqual(parse.run(a, "cab"), 'c');
            }],
            ["Zero choices construct error",
             function(){
                assert.throws(function(){ parse.run(parse.choice(), "aa"); }, parse.ParserError);
            }],
            ["Failed Choices",
            function(){
                var a = parse.choice(
                    parse.character('a'),
                    parse.character('b'),
                    parse.character('c'));
                
                assert.throws(parse.run.bind(undefined, a, "z"));
                
                assert.throws(parse.run.bind(undefined, a, ""));
             }],
             ["Choice Order",
             function(){
                var a = parse.choice(
                    parse.string('a'),
                    parse.string('aa'),
                    parse.string('aaa'));
                assert.deepEqual(parse.run(a, "aaaa"), 'a');
                
                assert.deepEqual(parse.run(parse.choice(
                    parse.string('aaa'),
                    parse.string('aa'),
                    parse.string('a')), 'aaaa'), 'aaa');
            }]
        ],
    };
});
