/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { vwPc, bpSp } from '../scripts/styleVariables';
import { useEffect, type Dispatch, type SetStateAction } from 'react';
import type { NewtWorkArticle } from '../lib/newt';

const styles = {
  modalOverlay: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    backdrop-filter: blur(8px);

    &.open {
      opacity: 1;
      pointer-events: all;
      visibility: visible;

      .modal-content {
        transform: translateY(0) scale(1);
        opacity: 1;
      }
    }
  `,
  modalContent: css`
    background: linear-gradient(145deg, rgba(23, 23, 23, 0.95), rgba(17, 17, 17, 0.98));
    padding: ${vwPc(50)} ${vwPc(60)};
    border-radius: 24px;
    min-height: 60vh;
    max-width: 85%;
    max-height: 85%;
    overflow-y: auto;
    position: relative;
    color: #fff;
    display: flex;
    width: ${vwPc(1400)};
    gap: ${vwPc(60)};
    transform: translateY(30px) scale(0.95);
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(255, 255, 255, 0.1);
    
    @media screen and (max-width: ${bpSp}) {
      display: block;
      padding: 6rem 2.5rem 4rem;
      max-width: 92%;
      width: 100%;
      border-radius: 20px;
      margin: 0 auto;
    }

    .modal-text-wrap {
      width: 48%;
      text-align: left;

      @media screen and (max-width: ${bpSp}) {
        width: 100%;
        margin-bottom: 3rem;
      }
    }

    .modal-image-wrap {
      overflow-y: scroll;
      width: 48%;
      border-radius: 16px;
      background: rgba(0, 0, 0, 0.3);
      padding: ${vwPc(24)};
      border: 1px solid rgba(255, 255, 255, 0.1);

      @media screen and (max-width: ${bpSp}) {
        width: 100%;
        padding: 1.5rem;
      }

      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 4px;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }

      img {
        max-height: initial;
        width: 100%;
        border-radius: 8px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease;
        
        &:hover {
          transform: scale(1.02);
        }
      }
    }

    .close-button {
      position: absolute;
      top: ${vwPc(20)};
      right: ${vwPc(20)};
      font-size: ${vwPc(32)};
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      cursor: pointer;
      line-height: 1;
      width: ${vwPc(44)};
      height: ${vwPc(44)};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.15);
        transform: rotate(90deg);
        border-color: rgba(255, 255, 255, 0.3);
      }

      @media screen and (max-width: ${bpSp}) {
        font-size: 2.4rem;
        width: 3.6rem;
        height: 3.6rem;
        top: 1.5rem;
        right: 1.5rem;
      }
    }

    h2 {
      margin-bottom: ${vwPc(36)};
      font-size: ${vwPc(28)};
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.4;
      background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0.8));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      @media screen and (max-width: ${bpSp}) {
        font-size: 2rem;
        margin-bottom: 2rem;
      }
    }

    .description {
      margin-bottom: ${vwPc(40)};
      font-size: ${vwPc(16)};
      line-height: 1.8;
      color: rgba(255, 255, 255, 0.85);
      font-weight: 400;

      @media screen and (max-width: ${bpSp}) {
        font-size: 1.4rem;
        margin-bottom: 2.2rem;
      }
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: ${vwPc(10)};
      margin-bottom: ${vwPc(32)};

      @media screen and (max-width: ${bpSp}) {
        gap: 0.8rem;
        margin-bottom: 2rem;
      }

      li {
        span {
          display: inline-block;
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-size: ${vwPc(13)};
          padding: ${vwPc(6)} ${vwPc(14)};
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.9);
          border-radius: 100px;
          transition: all 0.3s ease;
          font-weight: 500;

          &:hover {
            background: rgba(255, 255, 255, 0.12);
            border-color: rgba(255, 255, 255, 0.3);
            transform: translateY(-1px);
          }

          @media screen and (max-width: ${bpSp}) {
            font-size: 1.2rem;
            padding: 0.5rem 1rem;
          }
        }
      }
    }

    .link-button {
      font-size: ${vwPc(15)};
      position: relative;
      display: inline-flex;
      align-items: center;
      padding: ${vwPc(12)} ${vwPc(24)};
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 100px;
      transition: all 0.3s ease;
      font-weight: 500;

      &:hover {
        background: rgba(255, 255, 255, 0.15);
        transform: translateX(5px);
        border-color: rgba(255, 255, 255, 0.3);
      }

      @media screen and (max-width: ${bpSp}) {
        font-size: 1.3rem;
        padding: 0.8rem 1.6rem;
      }

      &::after {
        content: "";
        width: ${vwPc(18)};
        height: ${vwPc(18)};
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='27' height='27' viewBox='0 0 27 27' fill='none'%3E%3Cpath d='M4.96875 0V21.5312H26.5V0H4.96875ZM24.4297 19.4609H7.03906V2.07031H24.4297V19.4609Z' fill='%23fff'/%3E%3Cpath d='M2.07031 24.4297V15.3203V7.03906V4.96875H0V26.5H21.5312V24.4297H19.4609H2.07031Z' fill='%23fff'/%3E%3Cpath d='M12.0497 16.1914L18.1498 10.0912V14.4801H20.2201V6.55713H12.2972V8.62744H16.6861L10.5859 14.7276L12.0497 16.1914Z' fill='%23fff'/%3E%3C/svg%3E");
        background-size: contain;
        background-repeat: no-repeat;
        margin-left: ${vwPc(10)};
        opacity: 0.9;

        @media screen and (max-width: ${bpSp}) {
          width: 1.4rem;
          height: 1.4rem;
          margin-left: 0.8rem;
        }
      }
    }
  `
};

interface Props {
  data: NewtWorkArticle | null; // NewtAchievementArticle の型を定義
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const OpenModal: React.FC<Props> = ({ data, isOpen, setIsOpen }) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if(!data) return null;

  const tags = data.tag?.split(',') || [];
  const isSite = (data.category.slug === 'website') || (data.category.slug === 'lp');
  
  return (
    <div 
      className={`modal-overlay ${isOpen? 'open': ''}`} 
      css={styles.modalOverlay}
      onClick={(e) => {
        if(e.target === e.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <div className="modal-content" css={styles.modalContent}>
        <button className="close-button" onClick={() => {
          setIsOpen(false);
        }}>×</button>
        <div className="modal-text-wrap">
          <ul className="tags">
            {tags.length > 0 && tags[0] !== '' && tags.map((tag, tagIndex) => (
              <li key={tagIndex}><span className="tag">{tag}</span></li>
            ))}
          </ul>
          <h2>{data.title}</h2>
          <p className="description">
            {data.description}
          </p>
          {isSite && data.link && (
            <a href={data.link} target='_blank' rel="noopener noreferrer" className="link-button">
              Webサイトを見る
            </a>
          )}
        </div>
        {isSite && data.capture?.src && (
          <div className="modal-image-wrap">
            <img src={data.capture.src} alt={data.title} />
          </div>
        )}
      </div>
    </div>
  );
}

export default OpenModal;