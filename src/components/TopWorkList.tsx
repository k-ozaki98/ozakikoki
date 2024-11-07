/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { vwPc, bpSp } from '../scripts/styleVariables';
import { useState } from "react";
import OpenModal from "./OpenModal";
import type { NewtWorkArticle } from "../lib/newt";
import WorkContent from "./WorkContent";

interface Props {
  data: NewtWorkArticle[];
}

const styles = {
  workContainer: css`
		display: flex;
		justify-content: center;
		gap: ${vwPc(250)};
		margin: ${vwPc(80)} 0;
		@media screen and (max-width: ${bpSp}) {
			display: block;
		}
	`,
  workContent: css`
		.canvas {
			width: ${vwPc(574)};
			position: relative;
			@media screen and (max-width: ${bpSp}) {
				width: 26rem;
				margin: 0 auto;
			}
		}

		.main {
			width: ${vwPc(764)};
			height: ${vwPc(394)};
			object-fit: cover;
			object-position: 50% 50%;
			position: absolute;
			top: 53%;
			transform: translate(-50%, -50%);
			box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
			left: 50%;
			overflow: hidden;
			@media screen and (max-width: ${bpSp}) {
				width: 35rem;
				height: 18rem;
			}
		}

	`,
}

const TopWorkList: React.FC<Props> = ({ data }) => {

	const [activeData, setActiveData] = useState(null);
  	const [isOpen, setIsOpen] = useState(false);
	
	return (
		<div className="work-container" css={styles.workContainer}>
			{data.map((d, i) => (
				<div className="work-content" css={styles.workContent} key={i} onClick={() => {
					setIsOpen(true);
					setActiveData(d);
				}}>
					<div className="canvas">
						<picture>
							<source type="image/webp" srcSet="./assets/images/top/work-canvas.webp" />
							<img src="./assets/images/top/work-canvas.png" alt="キャンバス1"/>
						</picture>
						<div className="main">
							<WorkContent data={d} index={i} />
						</div>
					</div>
				</div>
			))}
			<OpenModal data={activeData} isOpen={isOpen} setIsOpen={setIsOpen} />
		</div>
	);
};

export default TopWorkList;