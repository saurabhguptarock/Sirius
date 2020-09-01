import React, { useEffect, useState } from "react";
import { Template, User } from "../types";
import FirebaseService from "../services";
import { connect } from "react-redux";
import { setLoading } from "../store/actions/AppStateAction";

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
      {templates.length > 0 &&
        !props.appState.isLoading &&
        templates.map((template) => (
          <div key={template.id}>{template.name}</div>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth.user, appState: state.appState };
};

export default connect(mapStateToProps)(Templates);
