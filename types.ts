// types.ts

export interface Blog {
    id: number;
    title: string;
    body: string;
    userId: number;
    created_at: Date;
    updated_at: Date;
    slug:string;
    summary:string
    tag_names:string;
  }

  export interface Tag {
    tagid: string;
    name:string
  }
  