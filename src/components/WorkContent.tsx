/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { vwPc, bpSp } from '../scripts/styleVariables';
import type { NewtWorkArticle } from '../lib/newt';

const styles = {
  workContent: css`
    cursor: pointer;
    width: 100%; // 固定幅から相対幅に変更
    height: 100%;
    position: relative;
    overflow: hidden;

    @media screen and (max-width: ${bpSp}) {
      width: 35rem;
      height: 18rem;
    }

    &:hover .overlay {
      opacity: 1;
    }

    .work-content__img {
      height: 100%;
      width: 100%;

      @media screen and (max-width: ${bpSp}) {
        height: 100%;
      }
    }

    .work-content__num {
      font-size: ${vwPc(40)};
      font-style: italic;
      font-weight: 900;
      font-family: "Inter", sans-serif;

      @media screen and (max-width: ${bpSp}) {
        font-size: 2rem;
      }
    }

    .work-content__category {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: ${vwPc(22)};

      @media screen and (max-width: ${bpSp}) {
        margin-bottom: 1.5rem;
      }

      li {
        margin-right: ${vwPc(24)};

        span {
          display: inline-block;
          border: 1px solid #FFF;
          font-size: ${vwPc(18)};
          padding: 3px 10px;

          @media screen and (max-width: ${bpSp}) {
            font-size: 1.1rem;
          }
        }
      }
    }

    .work-content__desc {
      font-size: ${vwPc(18)};
      font-weight: bold;
      line-height: 2;

      @media screen and (max-width: ${bpSp}) {
        margin-top: 1.5rem;
        font-size: 1rem;
      }
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      color: #fff;
      opacity: 0;
      transition: opacity 0.3s ease;
      padding: ${vwPc(70)};
      text-align: left;
    }

    .open-modal {
      position: absolute;
      bottom: ${vwPc(50)};
      right: ${vwPc(50)};

      svg {
        width: ${vwPc(32)};
        height: ${vwPc(34)};
        @media screen and (max-width: ${bpSp}) {
          width: 2.3rem;
          height: 3.4rem;
        }
      }
    }
  `
};

interface Props {
  data: NewtWorkArticle; // NewtAchievementArticle の型を定義
  index: number;
  onClick: () => void;
}

const WorkContent: React.FC<Props> = ({ data, index, onClick }) => {

  const number = index + 1;
  const defaultThumbnailSrc = '/assets/images/common/default-thumbnail-achievement.png';
  const tags = data.tag.split(',');
  
  return (
    <div 
      className="work-content" css={styles.workContent} key={index} onClick={onClick}>
      <img
        className="work-content__img img-fit"
        src={data.thumbnail?.src? `${data.thumbnail.src}?width=782&height=450&fit=crop`: defaultThumbnailSrc }
        alt={data.thumbnail?.title? data.thumbnail.title: ''}
      />
      <div className="overlay">
        <p className="work-content__num">
          { number }
        </p>
        <ul className="work-content__category">
          {(tags[0] !== '') && tags.map((tag, tagIndex) => (
            <li key={tagIndex}>
              <span>{tag}</span>
            </li>
          ))}
        </ul>
        <p className="work-content__desc">
          {data.description}
        </p>
        <div className="open-modal">
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="36" viewBox="0 0 35 36" fill="none">
            <path d="M29.1851 14.5C29.1851 21.6322 23.1892 27.5 15.6851 27.5C8.18088 27.5 2.18506 21.6322 2.18506 14.5C2.18506 7.36783 8.18088 1.5 15.6851 1.5C23.1892 1.5 29.1851 7.36783 29.1851 14.5Z" stroke="white" strokeWidth="3"/>
            <path d="M10.6851 14.3845L21.4543 14.3845" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M16.0698 9L16.0698 19.7692" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M32.2543 35.0607C32.8401 35.6465 33.7899 35.6465 34.3757 35.0607C34.9614 34.4749 34.9614 33.5252 34.3757 32.9394L32.2543 35.0607ZM23.7924 26.5987L32.2543 35.0607L34.3757 32.9394L25.9137 24.4774L23.7924 26.5987Z" fill="white"/>
          </svg>  
        </div>
      </div>
    </div>
  );
};

export default WorkContent;
