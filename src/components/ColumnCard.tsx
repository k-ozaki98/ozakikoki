/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { vwPc, bpSp } from '../scripts/styleVariables';
import React, { useEffect, useRef } from 'react';
import type { NewtColumnArticle } from '../lib/newt';
import { formatToEuropeanDate, formatToJapaneseDate } from '../scripts/utility';

interface Props {
  data: NewtColumnArticle;
}

const columnCardStyle = css`
  // width: calc((100% - ${vwPc(50)}) / 2);
  width: 100%;
  // border: 2px solid #000;
  background-color: #transparent;
  transition: .25s;
  height: 100%;
  font-family: "Barlow", sans-serif;
  font-weight: bold;

  @media screen and (max-width: ${bpSp}) {
  }

    &:hover {
    .thumb img {
      transform: scale(1.05); 
    }
      .st0 {
        transition: 0.3s;
          fill: #576ef0;
        }
  }

  .thumb {
    overflow: hidden;
    width: 100%;
    height: ${vwPc(350)};
    position: relative;

    @media screen and (max-width: ${bpSp}) {
      height: 9rem;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .overlay {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: #000;
      transform: translateX(100%);
    }
  }

  &.reveal .thumb .overlay {
    animation: revealImage 0.8s ease-out forwards;
  }

  @keyframes revealImage {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  > a {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .top {
    position: relative;
  }

  .thumb-cate {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    line-height: 1.8;
    font-size: ${vwPc(16)};
    background: linear-gradient(145deg, #00B3FF 0%, #1FD1D1 100%);
    color: #fff;
    padding: 0 ${vwPc(20)};

    @media screen and (max-width:${bpSp}) {
        line-height: 1.4;
      font-size: 1.2rem;
      padding: 0 1rem;
    }
  }

  .body {
    padding: ${vwPc(20)} ${vwPc(30)};
    padding-left: 0;
    padding-bottom: 0;
    height: 100%;
    line-height: 1.5;

    @media screen and (max-width:${bpSp}) {
    }
  }

  .body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .wrap {
      width: 80%;
    }

    .arrow {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      border-radius: 50%;
      width: ${vwPc(70)};
      height: ${vwPc(70)};

      svg {
        width: ${vwPc(30)};
        height: ${vwPc(30)};
      }
        .st0 {
        transition: 0.3s;
        }
    }
  }
  

  .ttl {
    font-size: ${vwPc(28)};
    margin-bottom: ${vwPc(20)};

    @media screen and (max-width:${bpSp}) {
      font-size: 1.2rem;
    }
  }

  .category li {
    color: #3BAA8A;
    border: 1px solid #3BAA8A;
    border-radius: 50px;
    font-size: ${vwPc(18)};
    display: inline-block;
    padding: 0 ${vwPc(20)};
    
  }

  .date {
    font-size: ${vwPc(20)};
    font-weight: bold;
    line-height: 1.5;
    @media screen and (max-width:${bpSp}) {
      font-size: 1rem;
    }
  }

`;

const ColumnCard: React.FC<Props> = ({ data }) => {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if(entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
          }
        });
      },
      {threshold: 0.1}
    );

    if(cardRef.current) {
      observer.observe(cardRef.current);
    }

    return() => {
      if(cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const defaultThumbnailSrc = '/assets/images/common/default-thumbnail-column.png';
  const createDate = formatToEuropeanDate(data._sys.createdAt);
  const updateDate = formatToJapaneseDate(data._sys.updatedAt);
  const isUpdate =  data._sys.createdAt !== data._sys.updatedAt;
  
  return (
    <article className="column-card" css={columnCardStyle} ref={cardRef}>
      <a href={`/blog/${data.slug}`}>
        <div className="body">
          <div className="wrap">
            <p className="date">{createDate}</p>
            <h3 className="ttl">{data.title}</h3>
          </div>
          <div className="arrow">
            <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve">
            <g>
              <polygon className="st0" points="243.253,0 202.714,40.539 389.5,227.335 12.736,227.335 12.736,284.665 389.5,284.665 
                202.714,471.461 243.253,512 499.264,256 	"></polygon>
            </g>
            </svg>
          </div>
        </div>
        <div className="top">
          <figure className="thumb">
            <img
              src={data.coverImage?.src? `${data.coverImage.src}?width=782&height=450&fit=crop`: defaultThumbnailSrc }
              alt={data.coverImage?.title? data.coverImage.title: ''} 
            />
            <div className="overlay"></div>
          </figure>
          {/* <p className="thumb-cate">{data.category[0].name}</p> */}
        </div>
        
      </a>
    </article>
    )
}

export default ColumnCard;