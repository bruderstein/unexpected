/* global global */
var basename = require('path').basename;
var debug = require('debug')('metalsmith-unexpected-markdown');
var dirname = require('path').dirname;
var extname = require('path').extname;
var resolve = require('path').resolve;
var marked = require('marked');
var fs = require('fs');
var async = require('async');
var extend = require('../lib/utils').extend;

var vm = require('vm');

var unexpected = require('../lib/').clone();
unexpected.output.preferredWidth = 80;
unexpected.installPlugin(require('magicpen-prism'));

var lightExpect = unexpected.clone()
    .installPlugin(require('./magicpen-github-syntax-theme'));

var darkExpect = unexpected.clone()
    .installPlugin(require('./magicpen-dark-syntax-theme'));

var styleRegex = /style=".*?"/;

function parseFlags(flagsString) {
    var flags = {};
    flagsString.split(/,/).forEach(function (flagString) {
        var m = /(\w+):(\w+)/.exec(flagString);
        flags[m[1]] = m[2] === 'true';
    });
    return flags;
}

function parseBlockInfo(lang) {
    var m = /^(\w+)#(\w+:\w+(,\w+:\w+)*)/.exec(lang);
    var flags = { evaluate: true };
    if (m) {
        lang = m[1];
        extend(flags, parseFlags(m[2]));
    }

    if (lang === 'js') {
        lang = 'javascript';
    }

    return {
        lang: lang,
        flags: flags
    };
}

function extractCodeSnippets(markdown) {
    var codeBlocks = [];

    var options = {};
    options.renderer = new marked.Renderer();
    options.renderer.code = function(code, blockInfoString, escaped) {
        var blockInfo = parseBlockInfo(blockInfoString);
        blockInfo.code = code;
        codeBlocks.push(blockInfo);
    };

    marked(markdown, options);
    return codeBlocks;
}

function extractTests(codeBlocks) {
    var tests = [];
    var evaluatedExampleIndex;
    codeBlocks.forEach(function (codeBlock, index) {
        var flags = codeBlock.flags;

        switch (codeBlock.lang) {
        case 'javascript':
            if (flags.evaluate) {
                evaluatedExampleIndex = index;
                tests.push({
                    code: codeBlock.code,
                    flags: flags
                });
            }
            break;
        case 'output':
            if (evaluatedExampleIndex === index - 1) {
                tests[tests.length - 1].output = codeBlock.code;
            }
            break;
        }
    });

    return tests;
}

function writeTestsToFile(exampleTests, done) {
    var pen = unexpected.output.clone();
    pen.indentationWidth = 4;
    pen.addStyle('escapedString', function (content) {
        this.text(JSON.stringify(content).replace(/^"|"$/g, ''));
    });

    // pen.text('/*global describe, it, beforeEach, setTimeout*/').nl();
    pen.text('// THIS FILE IS AUTOGENERATED! DO NOT CHANGE IT MANUALLY.').nl();
	pen.text('// It is built based on the examples in the documentation folder').nl();
	pen.text('// when the documentation site gets build by running "make site-build".').nl();
    pen.text('it.skipIf = function (condition) {').nl();
    pen.text('    (condition ? it.skip : it).apply(it, Array.prototype.slice.call(arguments, 1));').nl();
    pen.text('};').nl(2);

    pen.text('describe("documentation tests", function () {').nl();
    pen.indentLines();
	pen.i().text("var unexpected = typeof weknowhow === 'undefined' ? require('../lib/').clone() : weknowhow.expect.clone();").nl();
    pen.i().text("unexpected.output.preferredWidth = 80;").nl(2);

    pen.i().text("var isBrowser = typeof weknowhow !== 'undefined';").nl();
    pen.i().text("var isPhantom = typeof mochaPhantomJS !== 'undefined';").nl();

    pen.i().text('var expect;').nl();
    pen.i().text('beforeEach(function () {').nl();
    pen.indentLines();
    pen.i().text('expect = unexpected.clone();').nl();
    pen.outdentLines();
    pen.i().text('});').nl(2);

    Object.keys(exampleTests).sort().forEach(function (file, index) {
        var tests = exampleTests[file];
        if (tests.length === 0) {
            return;
        }

        if (index > 0) {
            pen.nl();
        }

        pen.i().text('it("').text(file).text(' contains correct examples", function () {').nl();
        pen.indentLines();
        pen.i().text('var testPromises = [];').nl();

        tests.forEach(function (test, index) {
            if (index > 0) {
                pen.nl();
            }

            var conditions = [];
            if (test.flags.skipPhantom) {
                conditions.push('!isPhantom');
            }
            if (test.flags.skipBrowser) {
                conditions.push('!isBrowser');
            }

            if (conditions.length > 0) {
                pen.i().text('if (').text(conditions.join(' || ')).text(') {').nl();
                pen.indentLines();
            }

            var lines;
            if (test.flags.async) {
                if (test.output) {
                    pen.i().text('testPromises.push(expect.promise(function () {').nl();
                    pen.indentLines();
                    pen.i().block('text', test.code).nl();
                    pen.outdentLines();
                    pen.i().text('}).then(function () {').nl();
                    pen.indentLines();
                    pen.i().text('return expect.promise(function () {').nl();
                    pen.indentLines();
                    pen.i().text('expect.fail(function (output) {').nl();
                    pen.indentLines();
                    pen.i().text('output.error("expected:").nl();').nl();
                    test.code.split(/\n/).forEach(function (line, index) {
                        pen.i().text('output.code("').escapedString(line).text('").nl();').nl();
                    });
                    pen.i().text('output.error("to throw");').nl();
                    pen.outdentLines();
                    pen.i().text('});').nl();
                    pen.outdentLines();
                    pen.i().text('});').nl();
                    pen.outdentLines();
                    pen.i().text('}).caught(function (e) {').nl();
                    pen.indentLines();
                    pen.i().text('expect(e, "to have message",').nl();
                    pen.indentLines();
                    lines = test.output.split(/\n/);
                    lines.forEach(function (line, index) {
                        pen.i().text('"').escapedString(line);
                        if (index < lines.length - 1) {
                            pen.text('\\n" +').nl();
                        } else {
                            pen.text('"');
                        }
                    });
                    pen.nl();
                    pen.outdentLines();
                    pen.i().text(');').nl();
                    pen.outdentLines();
                    pen.i().text('}));').nl();
                } else {
                    pen.i().text('testPromises.push(expect.promise(function () {').nl();
                    pen.indentLines();
                    pen.i().block('text', test.code);
                    pen.outdentLines();
                    pen.nl().i().text('}));');
                }
            } else {
                if (test.output) {
                    pen.i().text('try {').nl();
                    pen.indentLines();
                    pen.i().block('text', test.code).nl();
                    pen.i().text('expect.fail(function (output) {').nl();
                    pen.indentLines();
                    pen.i().text('output.error("expected:").nl();').nl();
                    test.code.split(/\n/).forEach(function (line, index) {
                        pen.i().text('output.code("').escapedString(line).text('").nl();').nl();
                    });
                    pen.i().text('output.error("to throw");').nl();
                    pen.outdentLines();
                    pen.i().text('});').nl();
                    pen.outdentLines();
                    pen.i().text('} catch (e) {').nl();
                    pen.indentLines();
                    pen.i().text('expect(e, "to have message",').nl();
                    pen.indentLines();
                    lines = test.output.split(/\n/);
                    lines.forEach(function (line, index) {
                        pen.i().text('"').escapedString(line);
                        if (index < lines.length - 1) {
                            pen.text('\\n" +').nl();
                        } else {
                            pen.text('"');
                        }
                    });
                    pen.nl();
                    pen.outdentLines();
                    pen.i().text(');').nl();
                    pen.outdentLines();
                    pen.i().text('}');
                } else {
                    pen.i().block('text', test.code);
                }
            }

            pen.nl();
            if (conditions.length > 0) {
                pen.outdentLines();
                pen.i().text('}').nl();
            }
        });

        pen.i().text('return expect.promise.all(testPromises);').nl();
        pen.outdentLines();
        pen.i().text('});').nl();
    });
    pen.outdentLines();
    pen.text('});').nl();

    fs.writeFile(resolve(__dirname, '..', 'test', 'documentation.spec.js'), pen.toString(), done);
}

function isPromise(value) {
    return value &&
        typeof value.then === 'function' &&
        typeof value.caught === 'function';
}


function evaluateExamples(expect, codeBlocks, cb) {
    var oldGlobal = extend({}, global);
    global.expect = expect.clone();

    async.eachSeries(codeBlocks, function (codeBlock, cb) {
        if (codeBlock.lang === 'javascript' && codeBlock.flags.evaluate) {
            try {
                if (codeBlock.flags.async) {
                    var promise = vm.runInThisContext(
                        '(function () { ' +
                            codeBlock.code +
                            '})();'
                    );
                    if (!isPromise(promise)) {
                        throw new Error('Async code block did not return a promise or throw\n' + codeBlock.code);
                    }
                    promise.then(function () {
                        cb();
                    }).caught(function (e) {
                        codeBlock.error = e;
                        cb();
                    });
                } else {
                    vm.runInThisContext(codeBlock.code);
                    cb();
                }
            } catch (e) {
                codeBlock.error = e;
                cb();
            }
        } else {
            cb();
        }
    }, function () {
        Object.keys(global).forEach(function (key) {
            if (!(key in oldGlobal)) {
                delete global[key];
            }
        });
        extend(global, oldGlobal);
        cb();
    });
}

function createUpdatedMarkdown(expect, content, codeBlocks, options) {
    var index = 0;
    var renderer = new marked.Renderer();
    renderer.code = function(code, blockInfoString, escaped) {
        var codeBlock = codeBlocks[index];
        var exampleBlock = codeBlocks[index - 1];
        index += 1;
        var lang = codeBlock.lang;
        if (lang === 'output') {
            if (exampleBlock && exampleBlock.lang === 'javascript') {
                if (exampleBlock.error) {
                    var error = exampleBlock.error;
                    var errorMessage = error._isUnexpected ?
                        error.output :
                        expect.output.clone().error(error.message);

                    return errorMessage.toString('html')
                        .replace(styleRegex, 'class="output"');
                }

                return '<div class="output"></div>';
            } else {
                throw new Error('No matching javascript block for output:\n' + codeBlock.code);
            }
        }

        return expect.output.clone().code(code, lang).toString('html')
            .replace(styleRegex, 'class="code ' + this.options.langPrefix + lang + '"');
    };

    return marked(content, extend({ renderer: renderer }, options));
}

module.exports = function plugin(options) {
    options = options || {};

    return function(files, metalsmith, next){
        var exampleTests = {};
        async.series([
            function (cb) {
                async.eachSeries(Object.keys(files).sort(), function (file, cb) {
                    debug('checking file: %s', file);
                    if (!markdown(file)) { return cb(); }
                    var data = files[file];
                    var dir = dirname(file);
                    var html = basename(file, extname(file)) + '.html';
                    if ('.' !== dir) html = dir + '/' + html;

                    var content = data.contents.toString();
                    var codeBlocks = extractCodeSnippets(content);
                    exampleTests[file] = extractTests(codeBlocks);

                    var exampleExpect = (files[file].theme === 'dark' ? darkExpect : lightExpect).clone();
                    evaluateExamples(exampleExpect, codeBlocks, function () {
                        var updatedMarkdown = createUpdatedMarkdown(exampleExpect, content, codeBlocks, options);
                        data.contents = new Buffer(updatedMarkdown);

                        debug('converting file: %s', file);
                        delete files[file];
                        files[html] = data;
                        cb();
                    });
                }, cb);
            },
            function (cb) {
                writeTestsToFile(exampleTests, cb);
            }
        ], next);
    };
};

function markdown(file){
    return /\.md|\.markdown/.test(extname(file));
}
