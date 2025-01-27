export type MultiSelect = {
  multi_select: Array<{
    id: string;
    name: string;
    color: string; // Notion-supported color
  }>;
};

export type NotionPage = {
  object: 'page';
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: 'user';
    id: string;
  };
  last_edited_by: {
    object: 'user';
    id: string;
  };
  cover: null; // Adjust `any` based on expected structure
  icon: null; // Adjust `any` based on expected structure
  parent: {
    type: 'database_id';
    database_id: string;
  };
  archived: boolean;
  in_trash: boolean;
  properties: {
    'Article Title': {
      title: Array<{
        type: 'text';
        text: {
          content: string;
          link: string | null;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string; // 'default' or other Notion-supported color
        };
        plain_text: string;
        href: string | null;
      }>;
    };
    Tags: {
      id: string;
      type: 'multi_select';
      multi_select: Array<{
        id: string;
        name: string;
        color: string; // Notion-supported color
      }>;
    };
    Description: {
      id: string;
      type: 'rich_text';
      rich_text: Array<{
        type: 'text';
        text: {
          content: string;
          link: string | null;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: string | null;
      }>;
    };
    'Date Posted': {
      id: string;
      type: 'date';
      date: {
        start: string;
        end: string | null;
        time_zone: string | null;
      };
    };
    Slug: {
      id: string;
      type: 'rich_text';
      rich_text: Array<{
        type: 'text';
        text: {
          content: string;
          link: string | null;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: string | null;
      }>;
    };
  };
  url: string;
  public_url: string | null;
};
