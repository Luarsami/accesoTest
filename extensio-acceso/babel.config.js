export default function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module-resolver",
                {
                    root: ["./src"],
                    extensions: [".tsx", ".ts", ".js", ".json"],
                    alias: {
                        // opcionalmente puedes declarar alias más explícitos:
                        navigation: "./src/navigation",
                        screens: "./src/screens",
                    },
                },
            ],
        ],
    };
};
