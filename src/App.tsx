import * as React from "react";
import { PrimitiveAtom, atom, useAtom, Atom } from "jotai";
import { selectAtom, splitAtom } from "jotai/utils";
import { focusAtom } from "jotai/optics";

import type { OpticFor } from "optics-ts";

const initialData = [
  {
    name: "test",
    selected: false
  },
  {
    name: "test 2",
    selected: false
  },
  {
    name: "test 3",
    selected: false
  },
  {
    name: "test 4",
    selected: false
  }
];
type ItemProps = {
  itemAtom: PrimitiveAtom<typeof initialData[number]>;
};
const Item = ({ itemAtom }: ItemProps) => {
  const [item, setItem] = useAtom(itemAtom);
  const selected = item.selected === true;

  return (
    <div
      style={{
        border: "1px solid",
        padding: "1px"
      }}
      onClick={() => {
        setItem((item) => ({ ...item, selected: !item.selected }));
      }}
    >
      <p>{item.name}</p>
      <p>{selected ? "selected" : "not selected"}</p>
    </div>
  );
};

const initialDataAtom = atom(initialData);
const selectedInitialDataAtom = focusAtom(initialDataAtom, (optic) =>
  optic.filter((item) => item.selected === true)
);
const selectedItemsAtomsAtom = splitAtom(selectedInitialDataAtom);

const unselectedInitialDataAtom = focusAtom(initialDataAtom, (optic) =>
  optic.filter((item) => item.selected === false)
);
const unselectedItemsAtomsAtom = splitAtom(unselectedInitialDataAtom);

const App: React.FC = () => {
  const [selectedItems] = useAtom(selectedItemsAtomsAtom);
  const [unselectedItems] = useAtom(unselectedItemsAtomsAtom);

  return (
    <div className="App">
      <p>
        Everything is editable, so click on items and feel free to change them
      </p>
      <div
        style={{
          display: "flex"
        }}
      >
        <div>
          {selectedItems.map((item) => (
            <Item itemAtom={item} key={`${item}`} />
          ))}
        </div>
        <div>
          {unselectedItems.map((item) => (
            <Item itemAtom={item} key={`${item}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
