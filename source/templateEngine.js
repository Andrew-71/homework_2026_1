'use strict';

// n.b.: I discovered optional chaining (`?.`), which tries to access object's
// field (among other things) unless the object itself doesn't exist,
// and nullish coalescing op (`??`), which is "or" but with null/undefined as 0,
// while trying to figure out how to remove ugly `if` checks. Pretty neat!

/**
 * Regular expression that matches template variables.
 *
 * @type {RegExp}
*/
const TEMPLATE_REGEX = /{{\s*([^{}\s]*)\s*}}/g;

/**
 * Parses a template string.
 *
 * @param {string} template - The template to parse.
 * @param {object} data - The object holding values referenced in the template.
 * @returns {string} The parsed string.
 *
 * @example
 * const template = "Hello, {{name}}!";
 * const data = { name: "World" };
 * templateEngine(template, data);
 * // returns "Hello, World!"
 */
function templateEngine(template, data) {
    return template.replaceAll(TEMPLATE_REGEX, (_, capture) => {
        return capture.split(".").reduce((obj, key) => obj?.[key], data) ?? "";
    });
}
