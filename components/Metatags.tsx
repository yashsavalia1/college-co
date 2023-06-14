import Head from 'next/head';

export default function Metatags({
  title = 'The Official College Co Website',
  description = 'A peer to peer marketplace for college students',
  image = 'https://college-co.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FCollegeCo.300e5e73.png&w=1080&q=75'
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@veds_22" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}