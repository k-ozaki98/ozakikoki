/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { bpSp, vwPc } from '../scripts/styleVariables';
import OpenModal from './OpenModal';
import { useEffect, useState } from 'react';
import BtnA from './BtnA';
import type { NewtWorkArticle } from '../lib/newt';
import WorkContent from './WorkContent';

const styles = {
  list: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${vwPc(36)};
    margin-bottom: ${vwPc(100)};

    @media screen and (max-width: ${bpSp}) {
      grid-template-columns: 1fr;
      gap: 2rem;
      margin-bottom: 3rem;
      
    }
  `,
};

interface Props {
  data: NewtWorkArticle[];
}

const itemsPerPage = 4;
const WorkList: React.FC<Props> = ({ data }) => {
  const [activeData, setActiveData] = useState<NewtWorkArticle | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [max, setMax] = useState(itemsPerPage);
  const [isMore, setIsMore] = useState(false);

  useEffect(() => {
    console.log('Active Data:', activeData);
    console.log('Is Open:', isOpen);
  }, [activeData, isOpen]);

  useEffect(() => {
    setIsMore(data.length > max);
  }, [data, max]);

  return (
    <div className="work-list">
      <div css={styles.list}>
        {data.map((d, i) => (
          (i >= max) ? null : (
            <WorkContent 
              key={d._id}
              data={d} 
              index={i} 
              onClick={() => {
                setActiveData(d);
                setIsOpen(true);
              }}
            />
          )
        ))}
      </div>
      <div className="u-align-c">
        {isMore && (
          <div onClick={() => setMax(max + itemsPerPage)}>
            <BtnA text="もっと見る" more={true} />
          </div>
        )}
      </div>
      <OpenModal 
        data={activeData}
        isOpen={isOpen}
        setIsOpen={(newIsOpen) => {
          setIsOpen(newIsOpen);
          if (!newIsOpen) {
            setActiveData(null);
          }
        }}
      />
    </div>
  );
};

export default WorkList;