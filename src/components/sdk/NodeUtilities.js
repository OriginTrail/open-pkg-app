

module.exports = {

    sortObjectRecursively(obj, inProperties = false) {
        if (obj != null && typeof obj === 'object') {
            const stringified = [];
            for (const key of Object.keys(obj)) {
                if (Array.isArray(obj)) {
                    if (obj[key] != null && typeof obj[key] === 'object') {
                        stringified.push(this.sortObjectRecursively(obj[key], inProperties));
                    } else {
                        // Added for better performance by avoiding the last level of recursion
                        // because the last level only returns JSON.stringify of the key
                        stringified.push(JSON.stringify(
                            obj[key],
                            (k, v) => (v === undefined ? null : v),
                        ));
                    }
                } else if (obj[key] != null && typeof obj[key] === 'object') {
                    if (key === 'properties') {
                        stringified.push(`"${key}":${this.sortObjectRecursively(obj[key], true)}`);
                    } else {
                        stringified.push(`"${key}":${this.sortObjectRecursively(obj[key], inProperties)}`);
                    }
                } else {
                    // Added for better performance by avoiding the last level of recursion
                    // because the last level only returns JSON.stringify of the key
                    stringified.push(`"${key}":${JSON.stringify(obj[key], (k, v) => (v === undefined ? null : v))}`);
                }
            }

            // Sort the object or sort the array if the sortArrays parameter is true
            if (!Array.isArray(obj) || inProperties === false) {
                stringified.sort();
            }

            // Return result in the format of a stringified array
            if (Array.isArray(obj)) {
                return `[${stringified.join(',')}]`;
            }
            // Return result in the format of an object
            return `{${stringified.join(',')}}`;
        }
        return JSON.stringify(obj, (k, v) => (v === undefined ? null : v));
    },
};
