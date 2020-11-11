import React from "react";
import { useLocation } from "react-router-dom";
import Card from "../../components/Card";
import Grid from "../../components/Grid";

import "./styles.css";

import noContentIcon from "../../assets/images/no-content.svg";

interface DashboardParams extends URLSearchParams {
  type?: string;
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Dashboard: React.FC = () => {
  const query = useQuery();

  const pending = query.get("type") === "pending";

  const count = 0;

  return (
    <div className="wrapper-dashboard">
      <div className="container-dashboard">
        <div className="title-dashboard">
          {!pending ? (
            <>
              <p>Orfanatos Cadastrados</p>
              <span>2 orfanatos</span>
            </>
          ) : (
            <>
              <p>Cadastros pendentes</p>
              <span>2 orfanatos</span>
            </>
          )}
        </div>
        <hr />
        {count > 0 ? (
          <div className="grid-dashboard">
            <Grid>
              <Card />
              <Card />
            </Grid>
          </div>
        ) : (
          <div className="no-content">
            <img src={noContentIcon} alt="No content" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
