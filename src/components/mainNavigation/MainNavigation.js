import { NavLink } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { GiBlackBook, GiMusicalKeyboard, GiDramaMasks } from "react-icons/gi";

import classes from "./MainNavigation.module.css";

const MainNavigation = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <h1>Tanis's GigBase</h1>
      </div>
      <nav className={classes.nav}>
        <ul>
          <div className={classes.newFormDiv}>
            <li className={classes.navItem} onClick={props.playerEntryClicked}>
              <FaUserPlus />
            </li>
            <li
              className={classes.navItem}
              onClick={props.pieceEntryClicked}
              style={{ marginRight: "3rem" }}
            >
              <GiBlackBook />
            </li>

            <li
              className={classes.navItem}
              onClick={props.instrumentEntryClicked}
              style={{ marginRight: "7rem" }}
            >
              <GiMusicalKeyboard />
            </li>

            <li
              className={classes.navItem}
              onClick={props.performanceEntryClicked}
              style={{ marginRight: "7rem" }}
            >
              <GiDramaMasks />
            </li>



          </div>

          <li className={classes.navItem}>
            <NavLink to={"/all-players"} activeClassName={classes.active}>
              {" "}
              Players Roster
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink to={"/all-gigs"} activeClassName={classes.active}>
              {" "}
              Gigs
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink to={"/season"} activeClassName={classes.active}>
              {" "}
              Season
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
