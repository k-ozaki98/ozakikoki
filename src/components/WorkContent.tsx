/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { vwPc, bpSp } from '../scripts/styleVariables';
import type { NewtWorkArticle } from '../lib/newt';

const styles = {
  workContent: css`
    cursor: pointer;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    transform: translateZ(0);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

      .work-content__img {
        transform: scale(1.05);
        filter: brightness(0.8) saturate(1.2);
      }

      .overlay {
        opacity: 1;
        visibility: visible;
        backdrop-filter: blur(8px);
        background: linear-gradient(
          135deg,
          rgba(0, 0, 0, 0.75) 0%,
          rgba(0, 0, 0, 0.85) 100%
        );

        &::after {
          transform: translate(-50%, -50%) scale(1.2);
          opacity: 0.15;
        }
      }

      .work-content__num {
        transform: translateX(0) rotate(0deg);
        opacity: 1;
      }

      .work-content__category {
        li {
          transform: translateY(0);
          opacity: 1;
        }
      }

      .work-content__desc {
        transform: translateY(0);
        opacity: 1;
      }

      .open-modal {
        transform: translate(0, 0);
        opacity: 1;
      }
    }

    .work-content__img {
      height: 100%;
      width: 100%;
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      object-fit: cover;
      transform: scale(1.001);
      filter: brightness(0.95);

      @media screen and (max-width: ${bpSp}) {
        height: 100%;
      }
    }

    .work-content__num {
      position: absolute;
      top: ${vwPc(40)};
      right: ${vwPc(40)};
      font-size: ${vwPc(80)};
      font-weight: 900;
      font-family: "Inter", sans-serif;
      background: linear-gradient(135deg, #fff 30%, rgba(255, 255, 255, 0.7));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      transform: translateX(50px) rotate(-10deg);
      opacity: 0;
      transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
      transition-delay: 0.1s;
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
      line-height: 1;
      z-index: 3;
      pointer-events: none;

      &[data-digits="2"] {
        font-size: ${vwPc(70)};
      }
      &[data-digits="3"] {
        font-size: ${vwPc(60)};
      }

      @media screen and (max-width: ${bpSp}) {
        font-size: 5rem;
        top: 2rem;
        right: 2rem;

        &[data-digits="2"] {
          font-size: 4.5rem;
        }
        &[data-digits="3"] {
          font-size: 4rem;
        }
      }
    }

    .work-content__category {
      display: flex;
      flex-wrap: wrap;
      gap: ${vwPc(10)};
      margin-bottom: ${vwPc(30)};

      li {
        transform: translateY(20px);
        opacity: 0;
        transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);

        @for $i from 1 through 10 {
          &:nth-child(#{$i}) {
            transition-delay: #{0.1 + $i * 0.05}s;
          }
        }

        span {
          display: inline-block;
          font-size: ${vwPc(14)};
          padding: ${vwPc(8)} ${vwPc(16)};
          background: rgba(255, 255, 255, 0.15);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 100px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight: 600;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          backdrop-filter: blur(4px);

          &:hover {
            background: rgba(255, 255, 255, 0.25);
            border-color: rgba(255, 255, 255, 0.5);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }

          @media screen and (max-width: ${bpSp}) {
            font-size: 1.1rem;
            padding: 0.6rem 1.2rem;
          }
        }
      }

      @media screen and (max-width: ${bpSp}) {
        gap: 0.8rem;
        margin-bottom: 2rem;
      }
    }

    .work-content__desc {
      font-size: ${vwPc(18)};
      font-weight: 500;
      line-height: 1.8;
      transform: translateY(30px);
      opacity: 0;
      transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
      transition-delay: 0.3s;
      color: rgba(255, 255, 255, 0.9);
      max-width: 80%;

      @media screen and (max-width: ${bpSp}) {
        font-size: 1.2rem;
        max-width: 100%;
      }
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0.75) 100%
      );
      color: #fff;
      opacity: 0;
      visibility: hidden;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      padding: ${vwPc(60)};
      text-align: left;
      backdrop-filter: blur(0px);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      z-index: 2;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 150%;
        height: 150%;
        background: radial-gradient(circle at center, 
          rgba(255, 255, 255, 0.15) 0%,
          transparent 70%
        );
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 0;
        transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
        pointer-events: none;
      }

      @media screen and (max-width: ${bpSp}) {
        padding: 3rem;
      }
    }

    .open-modal {
      position: absolute;
      top: ${vwPc(40)};
      left: ${vwPc(40)};
      transform: translate(-20px, -20px) rotate(-10deg);
      opacity: 0;
      transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
      transition-delay: 0.2s;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(8px);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      padding: ${vwPc(16)};
      width: ${vwPc(64)};
      height: ${vwPc(64)};
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        background: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translate(0, 0) scale(1.1) rotate(0deg);
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
      }

      @media screen and (max-width: ${bpSp}) {
        top: 2rem;
        left: 2rem;
        width: 5rem;
        height: 5rem;
        padding: 1rem;
      }

      svg {
        width: 100%;
        height: 100%;
        transform: scale(0.8);
        transition: transform 0.3s ease;
      }

      &:hover svg {
        transform: scale(0.9);
      }
    }
  `
};

interface Props {
  data: NewtWorkArticle;
  index: number;
  onClick: () => void;
}

const WorkContent: React.FC<Props> = ({ data, index, onClick }) => {
  const number = index + 1;
  const defaultThumbnailSrc = '/assets/images/common/default-thumbnail-achievement.png';
  const tags = data.tag.split(',');
  
  // 数字の桁数を計算
  const digits = number.toString().length;
  
  return (
    <div 
      className="work-content" 
      css={styles.workContent} 
      key={index} 
      onClick={onClick}
    >
      <img
        className="work-content__img img-fit"
        src={data.thumbnail?.src ? `${data.thumbnail.src}?width=782&height=450&fit=crop` : defaultThumbnailSrc}
        alt={data.thumbnail?.title ?? ''}
      />
      <div className="overlay">
        <p className="work-content__num" data-digits={digits}>{number}</p>
        <ul className="work-content__category">
          {tags[0] !== '' && tags.map((tag, tagIndex) => (
            <li key={tagIndex}>
              <span>{tag}</span>
            </li>
          ))}
        </ul>
        <p className="work-content__desc">{data.description}</p>
        <div className="open-modal">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 36" fill="none">
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