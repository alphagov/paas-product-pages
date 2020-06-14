/// <reference types="next" />
/// <reference types="next/types/global" />

interface IFallbackImage extends React.SVGProps<SVGImageElement> {
  readonly src: string;
}

declare namespace JSX {
  interface IntrinsicElements {
    readonly image: IFallbackImage;
  }
}

interface FrontMatter {
  __resourcePath: string;
  title: string;
  section: string;
  navLinkText: string;
}

declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
  export const frontMatter: FrontMatter[];
}
