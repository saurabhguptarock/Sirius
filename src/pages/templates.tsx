import React, { useEffect, useState } from "react";
import { Template, User } from "../types";
import FirebaseService from "../services";
import { connect } from "react-redux";
import { setLoading } from "../store/actions/AppStateAction";
import Head from "next/head";

interface Props {
  user: User;
  dispatch: Function;
  appState: {
    isLoading: boolean;
    error: string;
  };
}

const Templates = (props: Props) => {
  const [templates, setTemplates] = useState<Template[]>([]);

  const getTemplates = async () => {
    props.dispatch(setLoading(true));
    const temp = await FirebaseService.getAllTemplates("Business");
    if (temp) setTemplates(temp);
    props.dispatch(setLoading(false));
    console.log(temp);
  };

  useEffect(() => {
    getTemplates();
  }, []);

  return (
    <div>
      <Head>
        <title>Templates | Sirius</title>
      </Head>
      {templates.length > 0 &&
        !props.appState.isLoading &&
        templates.map((template) => (
          <div key={template.id} style={{ height: "300px", width: "300px" }}>
            <div className="card">
              <div className="card-image">
                <figure className="image is-16by9">
                  <img
                    style={{ borderRadius: "3px" }}
                    src={template.imgUrl}
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                    <figure className="image">
                      <img
                        style={{ height: "48px", width: "48px" }}
                        className="is-rounded"
                        src={template.userImg}
                        alt="Placeholder image"
                      />
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-4">{template.name}</p>
                    <p className="subtitle is-6">@{template.userName}</p>
                  </div>
                </div>

                <div style={{ lineHeight: "1.2rem" }} className="content">
                  {template.description}
                  <br />
                  <div className="content mt-3">
                    <i className="far fa-heart mr-1"></i>
                    {template.likes}
                    <i className="far fa-eye ml-4 mr-1"></i>
                    {template.usage}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth.user, appState: state.appState };
};

export default connect(mapStateToProps)(Templates);
