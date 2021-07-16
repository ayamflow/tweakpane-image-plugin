import {Controller, Value, ViewProps} from '@tweakpane/core';

import {PluginView} from './view';

interface Config {
	value: Value<HTMLImageElement>;
	extensions: string[];
	viewProps: ViewProps;
}

export class PluginController implements Controller<PluginView> {
	public readonly value: Value<HTMLImageElement>;
	public readonly view: PluginView;
	public readonly viewProps: ViewProps;

	constructor(doc: Document, config: Config) {
		this.value = config.value;
		this.viewProps = config.viewProps;

		this.view = new PluginView(doc, {
			value: this.value,
			viewProps: this.viewProps,
			extensions: config.extensions,
		});

		this.onFile_ = this.onFile_.bind(this);
		this.view.input.addEventListener('change', this.onFile_);

		this.viewProps.handleDispose(() => {
			this.view.input.removeEventListener('change', this.onFile_);
		});
	}

	private onFile_(event: Event): void {
		const files = (event?.target as HTMLInputElement).files;
		if (!files || !files.length) return;

		const file = files[0];
		const image = document.createElement('img');
		image.src = URL.createObjectURL(file);
		this.value.rawValue = image;
	}
}
