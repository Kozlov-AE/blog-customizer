import { ArrowButton } from 'src/ui/arrow-button';
import { Select } from 'src/ui/select';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import clsx from 'clsx';

import { FormEvent, useRef, useState } from 'react';

import styles from './ArticleParamsForm.module.scss';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useClose } from './hooks/useClose';

export type ArticleParamsProps = {
	resetButtonClicked: () => void;
	applyButtonClicked: (newState: ArticleStateType) => void;
	articleParamsState: ArticleStateType;
};

export const ArticleParamsForm = (props: ArticleParamsProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [state, setState] = useState(props.articleParamsState);
	// создаем `ref` для нашей формы и указываем его на внешнем блоке с формой
	const formRef = useRef<HTMLFormElement>(null);

	useClose({
		isOpen: isMenuOpen,
		onClose: closeMenu,
		rootRef: formRef,
	});

	function handleClick(): void {
		setIsMenuOpen(!isMenuOpen);
	}

	function handleApplyButtonClick(event: FormEvent): void {
		event.preventDefault();
		props.applyButtonClicked(state);
	}

	function handleResetButtonClick(): void {
		setState(props.articleParamsState);
		props.resetButtonClicked();
	}

	function closeMenu(): void {
		setIsMenuOpen(false);
	}

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => {
					handleClick();
				}}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					ref={formRef}
					className={styles.form}
					onSubmit={handleApplyButtonClick}>
					<Text as='h2' weight={800} size={31} uppercase={true}>
						Задайте параметры
					</Text>
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
