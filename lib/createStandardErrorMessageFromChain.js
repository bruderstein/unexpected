module.exports = function createStandardErrorMessageFromChain(output, calledAssertions, options) {

    options = options || {};
    var preamble = 'expected';

    var useSubject = true;
    var outputs = calledAssertions.reduce(function (outputs, assertion) {

        if (useSubject) {
            var subjectOutput = output.clone();
            outputs.push(subjectOutput);
            var subject = assertion.subject;
            subjectOutput.appendInspected(subject);
            useSubject = false;
        }
        outputs.push(output.clone().error(assertion.assertion.testDescriptionString));

        assertion.args.forEach(function (arg, index) {
            if (index !== 0) {
                outputs.push(',');
            }
            outputs.push(output.clone().appendInspected(arg));
        });

        return outputs;

    }, []);

    output.error(preamble);
    var remaining = output.preferredWidth - preamble.length;
    outputs.forEach(function (section) {
        var size = section.size();
        if (size.height > 1 || size.width > remaining) {
            output.nl().i().block(section);
            remaining = output.preferredWidth;
        } else {
            output.sp().block(section);
        }
        remaining -= size.width;
    });

    return output;
}
