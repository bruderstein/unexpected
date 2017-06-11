var createStandardErrorMessageFromChain = require('./createStandardErrorMessageFromChain');

module.exports = function chainingStandardErrorMessage(context, output, options) {
    options = typeof options === 'object' ? options : {};

    if ('omitSubject' in output) {
        options.subject = context.subject;
    }

    if (options && options.compact) {
        options.compactSubject = function (output) {
            output.jsFunctionName(context.subjectType.name);
        };
    }
    return createStandardErrorMessageFromChain(output, context.calledAssertions, options);
};
