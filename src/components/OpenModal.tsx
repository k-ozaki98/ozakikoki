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
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    opacity: 0;
    pointer-events: none;
    transition: .5s;

    &.open {
      opacity: 1;
      pointer-events: all;
    }
  `,
  modalContent: css`
    background-color: rgba(0, 0, 0, 0.85);
    padding: ${vwPc(50)} ${vwPc(60)};
    border-radius: 8px;
    min-height: 60vh;
    max-width: 80%;
    max-height: 80%;
    overflow-y: auto;
    position: relative;
    color: #fff;
    display: flex;
    width: ${vwPc(1400)};
    gap: ${vwPc(70)};
    
    @media screen and (max-width: ${bpSp}) {
      display: block;
      padding: 6rem 2.5rem 5rem;
      max-width: 100%;
      width: 100%;
      border-radius: 0;
    }

    .modal-text-wrap {
      width: 48%;
      text-align: left;

      @media screen and (max-width: ${bpSp}) {
        width: 100%;
        margin-bottom: 2.5rem;
      }
    }

    .modal-image-wrap {
      overflow-y: scroll;
      width: 48%;

      @media screen and (max-width: ${bpSp}) {
        width: 100%;
      }

      img {
        max-height: initial;
        width: 100%;
      }
    }

    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: ${vwPc(40)};
      color: #fff;
      background: none;
      border: none;
      cursor: pointer;
      line-height: 1;

      @media screen and (max-width: ${bpSp}) {
        font-size: 3.5rem;
      }
    }

    h2 {
      margin-bottom: ${vwPc(40)};
      font-size: ${vwPc(18)};

      @media screen and (max-width: ${bpSp}) {
        font-size: 1.4rem;
        margin-bottom: 2.2rem;
      }
    }

    .description {
      margin-bottom: ${vwPc(40)};
      font-size: ${vwPc(18)};

      @media screen and (max-width: ${bpSp}) {
        font-size: 1.4rem;
        margin-bottom: 1.8rem;
      }
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: ${vwPc(22)};

      @media screen and (max-width: ${bpSp}) {
        margin-bottom: 3rem;
      }

      li {
        margin-right: ${vwPc(24)};
        
        @media screen and (max-width: ${bpSp}) {
          margin-right: 1rem;
        }

        span {
          display: inline-block;
          border: 1px solid #FFF;
          font-size: ${vwPc(18)};
          padding: 3px 10px;
          background: transparent;
          color: #FFF;

          @media screen and (max-width: ${bpSp}) {
            font-size: 1.2rem;
          }
        }
      }
    }

    .tag {
      background-color: #f0f0f0;
    }

    .link-button {
      font-size: ${vwPc(18)};
      position: relative;
      display: inline-block;
      padding-right: ${vwPc(40)};

      @media screen and (max-width: ${bpSp}) {
        font-size: 1.2rem;
        padding-right: 2rem;

      }

      &::after {
        content: "";
        width: ${vwPc(26.5)};
        height: ${vwPc(26.5)};
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='27' height='27' viewBox='0 0 27 27' fill='none'%3E%3Cpath d='M4.96875 0V21.5312H26.5V0H4.96875ZM24.4297 19.4609H7.03906V2.07031H24.4297V19.4609Z' fill='%23fff'/%3E%3Cpath d='M2.07031 24.4297V15.3203V7.03906V4.96875H0V26.5H21.5312V24.4297H19.4609H2.07031Z' fill='%23fff'/%3E%3Cpath d='M12.0497 16.1914L18.1498 10.0912V14.4801H20.2201V6.55713H12.2972V8.62744H16.6861L10.5859 14.7276L12.0497 16.1914Z' fill='%23fff'/%3E%3C/svg%3E");        background-size: contain;
        background-repeat: no-repeat;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;

        @media screen and (max-width: ${bpSp}) {
          width: 2rem;
          height: 2rem;
          right: -1rem;
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
    console.log('Modal Data:', data);
    console.log('Modal Is Open:', isOpen);
  }, [data, isOpen]);

  if(!data) return null;

  const tags = data.tag?.split(',') || [];
  const isSite = (data.category.slug === 'website') || (data.category.slug === 'lp');
  
  return (
    <div 
      className={`modal-overlay ${isOpen? 'open': ''}`} 
      css={styles.modalOverlay}
      onClick={(e) => {
        if(e.target === e.currentTarget) {
          console.log('Modal overlay clicked');
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