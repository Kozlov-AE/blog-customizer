import { ArrowButton } from 'src/ui/arrow-button';
import { Select } from 'src/ui/select';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import clsx from 'clsx';

import { FormEvent, useState } from 'react';

import styles from './ArticleParamsForm.module.scss';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

export type ArticleParamsProps = {
	resetButtonClicked: () => void;
	applyButtonClicked: (newState: ArticleStateType) => void;
	articleParamsState: ArticleStateType;
};

export const ArticleParamsForm = (props: ArticleParamsProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [state, setState] = useState(props.articleParamsState);

	function handleClick(): void {
		setIsOpen(!isOpen);
	}

	function handleApplyButtonClick(event: FormEvent): void {
		event.preventDefault();
		props.applyButtonClicked(state);
	}

	function handleResetButtonClick(): void {
		setState(props.articleParamsState);
		props.resetButtonClicked();
	}

	document.addEventListener('mousedown', (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		if (isOpen && !target.closest(`.${styles.container}`)) {
			setIsOpen(false);
		}
	});

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					handleClick();
				}}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleApplyButtonClick}>
					<header>
						<h2 className={styles.title}>Задайте параметры</h2>
					</header>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={state.fontFamilyOption}
						onChange={(x) => setState({ ...state, fontFamilyOption: x })}
					/>
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						title={'размер шрифта'}
						onChange={(x) => setState({ ...state, fontSizeOption: x })}
					/>
					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={state.fontColor}
						onChange={(x) => setState({ ...state, fontColor: x })}
					/>
					<Separator />
					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={state.backgroundColor}
						onChange={(x) => setState({ ...state, backgroundColor: x })}
					/>
					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={state.contentWidth}
						onChange={(x) => setState({ ...state, contentWidth: x })}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleResetButtonClick}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
