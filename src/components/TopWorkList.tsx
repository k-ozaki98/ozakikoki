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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${vwPc(60)};
    margin: ${vwPc(80)} auto;
    width: 100%;
    max-width: ${vwPc(1600)}; // コンテンツ全体の最大幅
    
    @media screen and (max-width: ${bpSp}) {
      grid-template-columns: 1fr;
      gap: ${vwPc(40)};
      padding: 0 1rem;
    }
  `,
  workContent: css`
    width: 100%;
    aspect-ratio: 16/9;
    position: relative;

    @media screen and (max-width: ${bpSp}) {
      aspect-ratio: 35/18;
    }
  `
}

// TopWorkListコンポーネントも単純化
const TopWorkList: React.FC<Props> = ({ data }) => {
  const [activeData, setActiveData] = useState<NewtWorkArticle | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleWorkClick = (work: NewtWorkArticle) => {
    setActiveData(work);
    setIsOpen(true);
  };

  
  return (
    <div css={styles.workContainer}>
      {data.map((d, i) => (
        <div className="clip-path" css={styles.workContent} key={i}>
          <WorkContent 
            data={d} 
            index={i} 
            onClick={() => handleWorkClick(d)}
          />
        </div>
      ))}
      <OpenModal data={activeData} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default TopWorkList;