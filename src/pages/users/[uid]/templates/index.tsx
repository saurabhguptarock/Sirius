import React, { useEffect, useState } from "react";
import { Template, User } from "../../../../types";
import FirebaseService from "../../../../services";
import { connect } from "react-redux";

interface Props {
  user: User;
}

const Templates = (props: Props) => {
  const [templates, setTemplates] = useState<Template[]>([]);

  const getTemplates = async () => {
    const temp = await FirebaseService.getMyTemplates(props.user.uid);
    if (temp) setTemplates(temp);
  };

  useEffect(() => {
    if (props.user) getTemplates();
  }, [props.user]);

  return <div></div>;
};

const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps)(Templates);
