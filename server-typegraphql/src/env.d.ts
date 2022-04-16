declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: string;
			NODE_ENV: string;
			DB_URI: string;
		}
	}
}

export {};
