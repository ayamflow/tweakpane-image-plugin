import {
	BaseInputParams,
	BindingTarget,
	InputBindingPlugin,
	ParamsParsers,
	parseParams,
} from '@tweakpane/core';

import {PluginController} from './controller';

interface PluginInputParams extends BaseInputParams {
	extensions: string;
}
export const TweakpaneImagePlugin: InputBindingPlugin<
	HTMLImageElement,
	HTMLImageElement,
	PluginInputParams
> = {
	id: 'input-image',
	type: 'input',
	css: '__css__',

	accept(exValue: unknown, params: Record<string, unknown>) {
		if (!(exValue instanceof HTMLImageElement)) {
			return null;
		}

		const p = ParamsParsers;
		const result = parseParams<PluginInputParams>(params, {
			extensions: p.optional.string,
		});
		if (!result) {
			return null;
		}

		return {
			initialValue: exValue,
			params: result,
		};
	},

	binding: {
		reader(_args) {
			return (exValue: unknown): HTMLImageElement => {
				return exValue instanceof HTMLImageElement
					? exValue
					: document.createElement('img');
			};
		},

		writer(_args) {
			return (target: BindingTarget, inValue) => {
				target.write(inValue);
			};
		},
	},

	controller(args) {
		return new PluginController(args.document, {
			value: args.value,
			extensions: (args.params.extensions ?? '').replace(/\s/g, '').split(','),
			viewProps: args.viewProps,
		});
	},
};
