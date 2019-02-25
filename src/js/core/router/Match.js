const matchPath = (pathname, options) => {
    const { path } = options;

    if (!path) {
        return {
            path: null,
            url: pathname,
            isExact: true,
        }
    }

    const match = new RegExp(`^${path}`).exec(pathname);

    if (!match) {
        // There wasn't a match.
        return {
            path: path,
            url: null,
            isExact: false
        };
    }

    const url = match[0];
    const isExact = pathname === url;


    return {
        path,
        url,
        isExact,
    }
};

export default matchPath;