import {ClassName, Value, View, ViewProps} from '@tweakpane/core';

interface Config {
	value: Value<HTMLImageElement>;
	viewProps: ViewProps;
	extensions: string[];
}

const DEFAULT_EXTENSIONS = ['.jpg', '.png', '.gif'];

const className = ClassName('img');

export class PluginView implements View {
	public readonly element: HTMLElement;
	public readonly input: HTMLElement;
	private value_: Value<HTMLImageElement>;
	private image_: HTMLImageElement;

	constructor(doc: Document, config: Config) {
		this.element = doc.createElement('div');
		this.element.classList.add(className());
		config.viewProps.bindClassModifiers(this.element);

		this.value_ = config.value;
		this.value_.emitter.on('change', this.onValueChange_.bind(this));

		this.input = doc.createElement('input');
		this.input.classList.add(className('input'));
		this.input.setAttribute('type', 'file');
		this.input.setAttribute(
			'accept',
			(config.extensions ?? DEFAULT_EXTENSIONS).join(','),
		);
		this.element.appendChild(this.input);

		this.image_ = doc.createElement('img');
		this.image_.classList.add(className('image'));
		this.element.appendChild(this.image_);

		this.refresh_();
	}

	private refresh_(): void {
		const rawValue = this.value_.rawValue;
		this.image_.setAttribute('src', rawValue.src);
	}

	private onValueChange_() {
		this.refresh_();
	}
}
