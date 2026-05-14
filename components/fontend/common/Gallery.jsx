import React from 'react';
import Link from 'next/link';
import NextImage from 'next/image';


const Gallery = () => {
  return (
    <>
     
      <div className="container mx-auto p-4">
        <div id="latest-blog">
          <div className="text-center mb-8">
            <Link href="/album">
              <h2 className="text-3xl font-bold text-gray-800">ALBUM ẢNH</h2>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="blog-post">
              <Link href="/album/viet-nam-que-huong-toi">
                <div className="blog-thumb">
                  <NextImage src='/blog/blogpost1.jpg' alt="Vietnam" width={300} height={200} className="w-full rounded-lg" />
                </div>
              </Link>
              <div className="img-content mt-2 text-center">
                <h4><Link href="/album/viet-nam-que-huong-toi">Việt Nam quê hương tôi</Link></h4>
              </div>
            </div>
            <div className="blog-post">
              <Link href="/album/ha-tay-que-lua">
                <div className="blog-thumb">
                <NextImage src='/blog/blogpost2.jpg' alt="Vietnam" width={300} height={200} className="w-full rounded-lg" />

                </div>
              </Link>
              <div className="img-content mt-2 text-center">
                <h4><Link href="/album/ha-tay-que-lua">HÀ TÂY QUÊ LỤA</Link></h4>
              </div>
            </div>
            <div className="blog-post">
              <Link href="/album/truong-va-nhung-nguoi-ban">
                <div className="blog-thumb">
                <NextImage src='/blog/blogpost3.jpg' alt="Vietnam" width={300} height={200} className="w-full rounded-lg" />

                </div>
              </Link>
              <div className="img-content mt-2 text-center">
                <h4><Link href="/album/truong-va-nhung-nguoi-ban">TRƯỜNG VÀ NHỮNG NGƯỜI BẠN</Link></h4>
              </div>
            </div>
            <div className="blog-post">
              <Link href="/album/bsa">
                <div className="blog-thumb">
                <NextImage src='/blog/blogpost4.jpg' alt="Vietnam" width={300} height={200} className="w-full rounded-lg" />

                </div>
              </Link>
              <div className="img-content mt-2 text-center">
                <h4><Link href="/album/bsa">BSA</Link></h4>
              </div>
            </div>
            <div className="blog-post">
              <Link href="/album/bus-ha-noi">
                <div className="blog-thumb">
                <NextImage src='/blog/blogpost5.jpg' alt="Vietnam" width={300} height={200} className="w-full rounded-lg" />

                </div>
              </Link>
              <div className="img-content mt-2 text-center">
                <h4><Link href="/album/bus-ha-noi">XE BUS HÀ NỘI</Link></h4>
              </div>
            </div>
            <div className="blog-post">
              <Link href="/album/design">
                <div className="blog-thumb">
                <NextImage src='/blog/blogpost6.jpg' alt="Vietnam" width={300} height={200} className="w-full rounded-lg" />
                </div>
              </Link>
              <div className="img-content mt-2 text-center">
                <h4><Link href="/album/design">Design</Link></h4>
              </div>
            </div>
            <div className="blog-post">
              <Link href="/album/co-vai-thu-dang-yeu">
                <div className="blog-thumb">
                <NextImage src='/blog/blogpost7.jpg' alt="Vietnam" width={300} height={200} className="w-full rounded-lg" />

                </div>
              </Link>
              <div className="img-content mt-2 text-center">
                <h4><Link href="/album/co-vai-thu-dang-yeu">Có vài thứ đáng yêu</Link></h4>
              </div>
            </div>
            <div className="blog-post">
              <Link href="/album/nhat-ban-den-va-yeu">
                <div className="blog-thumb">
                <NextImage src='/blog/blogpost8.jpg' alt="Vietnam" width={300} height={200} className="w-full rounded-lg" />

                </div>
              </Link>
              <div className="img-content mt-2 text-center">
                <h4><Link href="/album/nhat-ban-den-va-yeu">Nhật Bản đến và yêu</Link></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
