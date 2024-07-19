import React from "react";
import clsx from "clsx";
import {
  useCurrentSidebarCategory,
  filterDocCardListItems,
} from "@docusaurus/theme-common";
import DocCardLinks from "../DocCardLinks";
import type { Props } from "@theme/DocCardList";

function DocCardListForCurrentSidebarCategory({ className }: Props) {
  const category = useCurrentSidebarCategory();
  return <DocCardList items={category.items} className={className} />;
}

export default function DocCardList(props: Props): JSX.Element {
  const { items, className } = props;
  if (!items) {
    return <DocCardListForCurrentSidebarCategory {...props} />;
  }
  const filteredItems = filterDocCardListItems(items);
  return (
    <div className={clsx(className)}>
      {filteredItems.map((item, index) => (
        <div key={index} className="margin-bottom--sm">
          <DocCardLinks item={item} />
        </div>
      ))}
    </div>
  );
}
