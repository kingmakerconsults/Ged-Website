const MAX_PROBE_FAILURES = 50;
const MAX_EXAMPLE_ENTRIES = 10;

const counters = {
    checked: 0,
    passed: 0,
    failed: 0,
    placeholderAttempts: 0,
    placeholderSuccess: 0,
    placeholderFailure: 0,
    stripped: 0
};

const recentProbeFailures = [];
const payloadsWithoutImages = new Map();

function toErrorMessage(error) {
    if (!error) return 'unknown_error';
    if (typeof error === 'string') return error;
    if (error instanceof Error) return error.message || error.toString();
    return String(error);
}

function normalizeSubject(subject) {
    if (typeof subject === 'string' && subject.trim()) {
        const label = subject.trim();
        const key = label.toLowerCase().replace(/[^a-z0-9]+/g, '_');
        return { key: key || 'unknown', label };
    }
    return { key: 'unknown', label: 'Unknown' };
}

function recordValidationCheck() {
    counters.checked += 1;
}

function recordValidationSuccess() {
    counters.passed += 1;
}

function recordValidationFailure() {
    counters.failed += 1;
}

function recordPlaceholderAttempt() {
    counters.placeholderAttempts += 1;
}

function recordPlaceholderSuccess() {
    counters.placeholderSuccess += 1;
}

function recordPlaceholderFailure() {
    counters.placeholderFailure += 1;
}

function recordProbeFailure({ url, error, subject, source }) {
    const entry = {
        url: typeof url === 'string' ? url : null,
        error: toErrorMessage(error),
        subject: subject || null,
        source: source || null,
        ts: Date.now()
    };
    recentProbeFailures.unshift(entry);
    if (recentProbeFailures.length > MAX_PROBE_FAILURES) {
        recentProbeFailures.length = MAX_PROBE_FAILURES;
    }
}

function recordPayloadWithoutImage(subject, { reason, id, index, source } = {}) {
    const { key, label } = normalizeSubject(subject);
    const entry = payloadsWithoutImages.get(key) || {
        subject: label,
        key,
        count: 0,
        reasons: {},
        examples: []
    };

    entry.count += 1;
    const reasonKey = typeof reason === 'string' && reason.trim() ? reason.trim() : 'unspecified';
    entry.reasons[reasonKey] = (entry.reasons[reasonKey] || 0) + 1;

    if (id != null || index != null || source) {
        entry.examples.unshift({
            ts: Date.now(),
            id: id ?? null,
            index: index ?? null,
            reason: reasonKey,
            source: source || null
        });
        if (entry.examples.length > MAX_EXAMPLE_ENTRIES) {
            entry.examples.length = MAX_EXAMPLE_ENTRIES;
        }
    }

    entry.lastUpdated = Date.now();
    payloadsWithoutImages.set(key, entry);
}

function recordImageStripped(subject, details = {}) {
    counters.stripped += 1;
    recordPayloadWithoutImage(subject, details);
}

function getSnapshot(extraTotals = {}) {
    const totals = {
        validationsChecked: counters.checked,
        validationsPassed: counters.passed,
        validationFailures: counters.failed,
        placeholderAttempts: counters.placeholderAttempts,
        placeholderSuccess: counters.placeholderSuccess,
        placeholderFailures: counters.placeholderFailure,
        strippedImages: counters.stripped,
        ...extraTotals
    };

    const payloadCounts = {};
    payloadsWithoutImages.forEach((value, key) => {
        payloadCounts[key] = {
            subject: value.subject,
            count: value.count,
            reasons: { ...value.reasons },
            examples: value.examples.map((example) => ({ ...example })),
            lastUpdated: value.lastUpdated || null
        };
    });

    return {
        totals,
        recentProbeFailures: recentProbeFailures.map((entry) => ({ ...entry })),
        payloadsWithoutImages: payloadCounts
    };
}

module.exports = {
    recordValidationCheck,
    recordValidationSuccess,
    recordValidationFailure,
    recordPlaceholderAttempt,
    recordPlaceholderSuccess,
    recordPlaceholderFailure,
    recordProbeFailure,
    recordImageStripped,
    recordPayloadWithoutImage,
    getSnapshot
};
