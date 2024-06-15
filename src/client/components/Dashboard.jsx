import { CrudGridUsers } from "./CrudGridUsers";
import { CrudGridGames } from "./CrudGridGames";
import { CrudGridMerch } from "./CrudGridMerch";
import { CrudGridHardware } from "./CrudGridHardware";
import { CrudGridTransact } from "./CrudGridTransact";

export const Dashboard = ({ admin }) => {
  return (
    <>
      <h1>This is the Admin dashboard.</h1>


      {admin && (
        <div className="grids-container">
          <div>
            <h3>Transaction Table</h3>
            <CrudGridTransact />
          </div>
          <div>
            <h3>Users Table</h3>
            <CrudGridUsers admin={admin} />
          </div>
          <div>
            <h3>Games Table</h3>
            <CrudGridGames admin={admin} />
          </div>
          <div>
            <h3>Merchandise Table</h3>
            <CrudGridMerch admin={admin} />
          </div>
          <div>
            <h3>Hardware Table</h3>
            <CrudGridHardware admin={admin} />
          </div>
        </div>
      )}
    </>
  );
};
