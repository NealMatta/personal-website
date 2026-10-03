/*
Shapes shared by the typed content files in `src/content/`.

A long-form write-up is a list of sections wherever it appears — a project
case study, a build log, a field note — so the shape and the "on this
page" rail that reads it live here rather than in any one of them.
*/

export interface Section {
  /** Anchor for the "on this page" rail. */
  id: string;
  heading: string;
  /** One string per paragraph. */
  body: string[];
}
