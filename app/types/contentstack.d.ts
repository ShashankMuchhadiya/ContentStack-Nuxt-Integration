/**
 * ContentStack Type Definitions
 */

// ContentStack Error Type
export interface ContentStackError {
	status?: number;
	error_message?: string;
	error_code?: string;
	errors?: Record<string, unknown>;
}

// ContentStack Method Arguments
export interface ContentStackMethodArguments {
	key: string;
	value: unknown;
}

// ContentStack Query Options
export interface ContentStackQueryOptions {
	limit?: number;
	skip?: number;
	only?: string[];
	except?: string[];
	includeReference?: string[];
	includeCount?: boolean;
	[key: string]: unknown;
}

// Declare global types for auto-imports
declare global {
	type ContentStackError = import("./contentstack").ContentStackError;
	type ContentStackQueryOptions = import("./contentstack").ContentStackQueryOptions;
	type ContentStackMethodArguments = import("./contentstack").ContentStackMethodArguments;
}

export {};
