'use strict';

// n.b.: I discovered optional chaining (`?.`), which tries to access object's
// field (among other things) unless the object itself doesn't exist,
// and nullish coalescing op (`??`), which is "or" but with null/undefined as 0,
// while trying to figure out how to remove ugly `if` checks. Pretty neat!

/**
 * Parses a template string.
 *
 * @param {string} template - The template to parse.
 * @param {object} data - The object holding values referenced in the template.
 * @returns {string} The parsed string.
 */
function templateEngine(template, data) {
    const re = /{{\s*([^{}\s]*)\s*}}/g;
    return template.replaceAll(re, (_, capture) => {
        return capture.split(".").reduce((obj, key) => obj?.[key], data) ?? "";
    });
}
