import { test } from '@playwright/test';

function getOriginalClass(instance: any, methodName: string): string {
    return instance.constructor.name;
}

function extractFunctionParamNames(func: Function): { paramNames: string[], defaultValues: Map<string, any> } {
    const funcStr = func.toString();
    const match = funcStr.match(/\(([^)]*)\)/);
    const paramNames: string[] = [];
    const defaultValues = new Map<string, any>();

    if (match && match[1]) {
        const params = match[1].split(',').map(p => p.trim());
        params.forEach(param => {
            if (param.includes('=')) {
                const [name, value] = param.split('=').map(p => p.trim());
                paramNames.push(name);
                try {
                    defaultValues.set(name, eval(value));
                } catch {
                    defaultValues.set(name, value);
                }
            } else if (param) {
                paramNames.push(param.replace(/:\s*.+/, '').trim());
            }
        });
    }

    return { paramNames, defaultValues };
}

function replacePlaceholders(template: string, args: any[], paramNames: string[], defaultValues: Map<string, any>): string {
    let result = template;
    paramNames.forEach((paramName, index) => {
        const value = args[index] !== undefined ? args[index] : defaultValues.get(paramName);
        const placeholder = new RegExp(`\\{${paramName}\\}`, 'g');
        result = result.replace(placeholder, String(value));
    });
    return result;
}

export function step<T>(_stepName?: string) {
    return function (target: (...args: any[]) => Promise<T>, context: ClassMethodDecoratorContext) {
        return function (this: any, ...args: any[]): Promise<T> {
            const isStatic = typeof this === 'function';
            const className = isStatic ? this.name : getOriginalClass(this, context.name.toString());
            const methodDetails = `${className}.${context.name.toString()}`;

            const { paramNames, defaultValues } = extractFunctionParamNames(target);

            const name = _stepName
                ? `${replacePlaceholders(_stepName, args, paramNames, defaultValues)} - ${methodDetails}`
                : methodDetails;

            const error = new Error('Capturing stack trace');
            const stackLines = error.stack?.split('\n') || [];
            const stack = stackLines.find(line => line.includes('.ts:') && !line.includes('step-decorator.ts'));
            const filePath = stack?.match(/tests\/(.+)/);
            const finalPath = filePath ? `.../${filePath[1]}` : null;

            const stepNameWithStack = `${name} — ${finalPath}`;

            return test.step(stepNameWithStack, async () => {
                return await target.call(this, ...args) as T;
            });
        };
    };
}