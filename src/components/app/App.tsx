import styles from './App.module.scss';

import { useState, CSSProperties } from 'react';

import { defaultArticleState } from 'src/constants/articleProps';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				resetButtonClicked={() => {
					setArticleState(defaultArticleState);
				}}
				applyButtonClicked={(x) => {
					setArticleState(x);
				}}
				articleParamsState={defaultArticleState}
			/>
			<Article />
		</main>
	);
};
