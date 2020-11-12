import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../../components/Card";
import Grid from "../../components/Grid";

import useQuery from "../../hooks/useQuery";

import noContentIcon from "../../assets/images/no-content.svg";

import "./styles.css";
import api from "../../services/api";
import { Orphanage } from "../../models/Orphanage";

const Dashboard: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>();

  const query = useQuery(useLocation().search);
  const pending = query.get("type") === "pending";

  const orphanagesCount = useMemo(() => {
    return orphanages ? orphanages.length : 0;
  }, [orphanages]);

  useEffect(() => {
    async function loadOrphanages() {
      const { data } = await api.get(`/orphanages?pending=${pending}`);

      setOrphanages(data);
    }

    loadOrphanages();
  }, [pending]);

  return (
    <div className="wrapper-dashboard">
      <div className="container-dashboard">
        <div className="title-dashboard">
          {!pending ? (
            <>
              <p>Orfanatos Cadastrados</p>
            </>
          ) : (
            <>
              <p>Cadastros pendentes</p>
            </>
          )}
          <span>{orphanagesCount} orfanatos</span>
        </div>

        <hr />
        <div className="item-container">
          {orphanagesCount > 0 ? (
            <div className="grid-dashboard">
              <Grid>
                {orphanages?.map((orphanage) => (
                  <Card orphanage={orphanage} />
                ))}
              </Grid>
            </div>
          ) : (
            <div className="no-content">
              <img src={noContentIcon} alt="No content" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
