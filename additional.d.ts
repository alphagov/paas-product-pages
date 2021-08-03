interface IFallbackImage extends React.SVGProps<SVGImageElement> {
  readonly src: string;
}
  
declare namespace JSX {
  interface IntrinsicElements {
    readonly image: IFallbackImage;
  }
}
  
interface FrontMatter {
  path: string;
  title: string;
  section: string;
  navLinkText: string;
  order: Integer;
}

declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
  export const frontMatter: FrontMatter[];
}
  