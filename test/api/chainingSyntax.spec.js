/*global expect*/
describe('chaining syntax', function () {

    describe('when adding assertions', function () {

        it('adds a chaining method', function () {
            var clonedExpect = expect.clone();
            clonedExpect.addAssertion('<string> to foo', function (expect, subject) {

            });

            clonedExpect('foo').toFoo();
        });

        it('calls the handler', function () {
            var clonedExpect = expect.clone();
            clonedExpect.addAssertion('<string> to foo', function (expect, subject) {
                expect.fail()
            });

            expect(function () {
                clonedExpect('foo').toFoo();
            }, 'to throw', 'expected \'foo\' to foo');
        });

        it('returns the diff in case of failure', function () {
            var clonedExpect = expect.clone();
            clonedExpect.addAssertion('<string> to foo', function (expect, subject) {
                expect.fail({
                    diff: function (output) {
                        return output.error('-foo+bar');
                    }
                });
            });

            expect(function () {
                clonedExpect('foo').toFoo();
            }, 'to throw',
                [
                    'expected \'foo\' to foo',
                    '',
                    '-foo+bar'
                ].join('\n')
            );

        });

        it('calls the correct handler depending on type', function () {
            var clonedExpect = expect.clone();
            clonedExpect.addAssertion('<string> to foo', function (expect, subject) {});
            clonedExpect.addAssertion('<number> to foo', function (expect, subject) {
                expect.fail();
            });
            clonedExpect('foo').toFoo();
            expect(function () {
                clonedExpect(42).toFoo();
            }, 'to throw', 'expected 42 to foo');
        });

        it('calls the correct handler depending on argument type', function () {
            var clonedExpect = expect.clone();
            clonedExpect.addAssertion('<string> to foo <string>', function (expect, subject) {});
            clonedExpect.addAssertion('<string> to foo <number>', function (expect, subject) {
                expect.fail();
            });
            clonedExpect('foo').toFoo('foo');
            expect(function () {
                clonedExpect('foo').toFoo(42);
            }, 'to throw', 'expected \'foo\' to foo 42');
        });
    });

    describe('with promises', function () {
        it('passes the result asynchronously to the next assertion', function () {
           var clonedExpect = expect.clone();
           clonedExpect.addAssertion('<string> when delayed a bit and doubled <assertion>', function (expect, subject) {
              return expect.promise(function (resolve, reject) {
                  setTimeout(function () {
                      expect.shift(subject + subject);
                      resolve();
                  }, 10);
              });
           });

           return clonedExpect('foo').whenDelayedABitAndDoubled().toEqual('foofoo');
        });

        it('rejects when the next assertion fails', function () {
            var clonedExpect = expect.clone();
            clonedExpect.addAssertion('<string> when delayed a bit and doubled <assertion>', function (expect, subject) {
                return expect.promise(function (resolve, reject) {
                    setTimeout(function () {
                        expect.shift(subject + subject);
                        resolve();
                    }, 10);
                });
            });

            return expect(clonedExpect('foo').whenDelayedABitAndDoubled().toEqual('bar'),
                'to be rejected with',
                [
                    'expected \'foo\' when delayed a bit and doubled to equal \'bar\'',
                    '',
                    '-foofoo',
                    '+bar'
                ].join('\n')
            );
        });

        it('keeps the diff if expect.fail is called asynchronously', function () {
            var clonedExpect = expect.clone();
            clonedExpect.addAssertion('<string> when delayed failing <assertion>', function (expect, subject) {
                return expect.promise(function (resolve, reject) {
                    setTimeout(function () {
                        try {
                            expect.fail({
                                diff: function (output) {
                                    return output.error('---+++');
                                }
                            });
                        } catch (e) {
                            reject(e);
                        }
                    }, 10);
                });
            });

            return expect(clonedExpect('foo').whenDelayedFailing().toEqual('bar'),
                'to be rejected with',
                [
                    'expected \'foo\' when delayed failing',
                    '',
                    '---+++'
                ].join('\n')
            );
        });

        it('returns a promise resolving with the subject without any async assertions', function () {
            return expect(expect(42).toEqual(42), 'to be fulfilled with', 42);
        });

        it('returns a promise resolving with the subject when using async assertions', function () {
            var clonedExpect = expect.clone();
            clonedExpect.addAssertion('<number> when delayed a bit', function (expect, subject) {
               return expect.promise(function (resolve, reject) {
                   setTimeout(resolve, 10);
               });
            });
           return expect(clonedExpect(42).whenDelayedABit().toEqual(42), 'to be fulfilled with', 42);
        });
    });

    describe('errors', function () {
       it('returns a nested error', function () {

           var clonedExpect = expect.clone();
           clonedExpect.addAssertion('<string> to foo', function (expect, subject) {
               expect.errorMode = 'nested';
               expect(subject).toEqual('foo');
           });

           expect(function () {
               clonedExpect('bar').toFoo();
           }, 'to throw',
               [
                   'expected \'bar\' to foo',
                   '  expected \'bar\' to equal \'foo\'',
                   '',
                   '  -bar',
                   '  +foo'
               ].join('\n')
           )
       });

       it('indents on a nested error mode when shifting', function () {
           var clonedExpect = expect.clone();
           clonedExpect.addAssertion('<string> when shifted <assertion>', function (expect, subject) {
              expect.errorMode = 'nested';
              expect.shift();
           });

           expect(function () {
               clonedExpect('foo').whenShifted().toEqual('bar')
           }, 'to throw',
               [
                   'expected \'foo\' when shifted to equal \'bar\'',
                   '  expected \'foo\' to equal \'bar\'',
                   '',
                   '  -foo',
                   '  +bar'
               ].join('\n')
           );
       });

        it('indents multiple levels on a nested error mode when shifting', function () {
            var clonedExpect = expect.clone();
            clonedExpect.addAssertion('<string> when shifted <assertion>', function (expect, subject) {
                expect.errorMode = 'nested';
                expect.shift();
            });

            expect(function () {
                    clonedExpect('foo').whenShifted().whenShifted().toEqual('bar')
                }, 'to throw',
                [
                    'expected \'foo\' when shifted when shifted to equal \'bar\'',
                    '  expected \'foo\' when shifted to equal \'bar\'',
                    '    expected \'foo\' to equal \'bar\'',
                    '',
                    '    -foo',
                    '    +bar'
                ].join('\n')
            );
        });

        it('bubbles an error from lower', function () {
            var clonedExpect = expect.clone();
            clonedExpect.addAssertion('<string> to foo', function (expect, subject) {
                expect.errorMode = 'bubble';
                expect.fail('foo error bubbling');
            });

            clonedExpect.addAssertion('<string> when shifting <assertion>', function (expect, subject) {
                expect.errorMode = 'bubble';
                expect.shift();
            });

            expect(function () {
                clonedExpect('bar').whenShifting().toFoo();
            }, 'to throw', 'foo error bubbling');

        });

        it('bubbles an error from lower nested', function () {
            var clonedExpect = expect.clone();
            clonedExpect.addAssertion('<string> to foo', function (expect, subject) {
                expect.errorMode = 'nested';
                expect.fail('foo error bubbling');
            });

            clonedExpect.addAssertion('<string> when shifting <assertion>', function (expect, subject) {
                expect.errorMode = 'bubble';
                expect.shift();
            });

            expect(function () {
                clonedExpect('bar').whenShifting().toFoo();
            }, 'to throw',
            [
                'expected \'bar\' to foo',
                '  foo error bubbling'
            ].join('\n'))
        });

        it('nested bubbling', function () {
           expect.addAssertion('<string> nested error <assertion?>', function (expect, subject) {
               expect.errorMode = 'nested';
               expect.shift(subject);
           });
            expect.addAssertion('<string> bubble error <assertion?>', function (expect, subject) {
                expect.errorMode = 'bubble';
                expect.shift(subject);
            });

            expect.addAssertion('<string> to fail with nested', function (expect) {
                expect.errorMode = 'nested';
                expect.fail('failed')
            });
            expect.addAssertion('<string> to fail with bubble', function (expect) {
                expect.errorMode = 'bubble';
                expect.fail('failed')
            });

            expect(function () {
                    expect('foo').nestedError().nestedError().bubbleError().toFailWithNested();
                    expect('foo', 'nested error', 'nested error', 'bubble error', 'to fail with nested')
                }, 'to throw',
                [
                   "expected 'foo' nested error nested error bubble error to fail with nested",
                   "  expected 'foo' nested error bubble error to fail with nested",
                   "    expected 'foo' to fail with nested",
                   "      failed"
                ].join('\n')
            );
        });
    });

});

