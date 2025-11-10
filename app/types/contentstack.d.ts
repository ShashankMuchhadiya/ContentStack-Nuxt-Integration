/**
 * ContentStack Type Definitions
 * Re-exported from contentstack.ts for global type declarations
 */

// Declare global types for auto-imports
declare global {
	type ContentStackError = import("./contentstack").ContentStackError;
	type ContentStackQueryOptions = import("./contentstack").ContentStackQueryOptions;
	type ContentStackMethodArguments = import("./contentstack").ContentStackMethodArguments;
}

export {};
