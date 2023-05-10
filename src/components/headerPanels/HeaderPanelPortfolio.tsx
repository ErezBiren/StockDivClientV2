import { useDispatch, useSelector } from "react-redux";
import { useGetAssetsQuery } from "../../features/portfolio/portfolioApiSlice";
import {
  selectCurrentPortfolio,
  selectPortfolioView,
  setPortfolioView,
} from "../../features/stockdivSlice";
import { Menu, Item, useContextMenu } from "react-contexify";
import { MdCancelPresentation, MdPreview, MdSaveAs } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import { ViewModeEnum } from "../../utils/enums/ViewModeEnum";

const MENU_ID = "assets-header";

const HeaderPanelPortfolio = () => {
  const selectedPortfolio = useSelector(selectCurrentPortfolio);

  const portfolioView = useSelector(selectPortfolioView);

  const { show } = useContextMenu({
    id: MENU_ID,
  });

  const dispatch = useDispatch();

  const { data: assets } = useGetAssetsQuery(selectedPortfolio);

  const switchView = () => {
    const newPortfolioView = {
      ...portfolioView,
      mode:
        portfolioView.mode === ViewModeEnum.CARD
          ? ViewModeEnum.TABLE
          : ViewModeEnum.CARD,
    };

    dispatch(setPortfolioView(newPortfolioView));
  };

  return (
    <div className="p-2 shadow-lg bg-cardBackground">
      <div className="flex flex-row items-center justify-between gap-2">
        <span>{assets?.length} assets</span>
        <span className="w-[1px] h-6 bg-slate-400" />
        <span
          className="cursor-pointer"
          onClick={(e) => {
            show({ event: e });
          }}
        >
          <FiMoreVertical />
        </span>
      </div>
      <div className="flex flex-col items-center"></div>
      <Menu id={MENU_ID}>
        <Item onClick={switchView}>
          <MdPreview />
          <span className="ml-2">Switch View</span>
        </Item>
        <Item>
          <MdSaveAs />
          <span className="ml-2">Save View</span>
        </Item>
        <Item>
          <MdCancelPresentation />
          <span className="ml-2">Toggle closed positions</span>
        </Item>
      </Menu>
    </div>
  );
};

export default HeaderPanelPortfolio;
