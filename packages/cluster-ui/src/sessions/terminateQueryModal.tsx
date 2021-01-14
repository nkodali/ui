// Copyright 2020 The Cockroach Authors.
//
// Use of this software is governed by the Business Source License
// included in the file licenses/BSL.txt.
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the Apache License, Version 2.0, included in the file
// licenses/APL.txt.

import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { Modal } from "../modal";
import { Text } from "../text";

// import {cockroach} from "src/js/protos";
// import {trackTerminateQuery} from "src/util/analytics/trackTerminate";

// import ICancelQueryRequest = cockroach.server.serverpb.ICancelQueryRequest;
type ICancelQueryRequest = any;

export interface TerminateQueryModalRef {
  showModalFor: (req: ICancelQueryRequest) => void;
}

interface TerminateQueryModalProps {
  //cancel: (req: ICancelQueryRequest) => void;
  cancel?: (req: ICancelQueryRequest) => void;
}

// tslint:disable-next-line:variable-name
const TerminateQueryModal = (
  props: TerminateQueryModalProps,
  ref: React.RefObject<TerminateQueryModalRef>,
) => {
  const { cancel } = props;
  const [visible, setVisible] = useState(false);
  const [req, setReq] = useState<ICancelQueryRequest>();

  const onOkHandler = useCallback(() => {
    cancel(req);
    //trackTerminateQuery();
    setVisible(false);
  }, [req, cancel]);

  const onCancelHandler = useCallback(() => setVisible(false), []);

  useImperativeHandle(ref, () => {
    return {
      showModalFor: (r: ICancelQueryRequest) => {
        setReq(r);
        setVisible(true);
      },
    };
  });

  return (
    <Modal
      visible={visible}
      onOk={onOkHandler}
      onCancel={onCancelHandler}
      okText="Yes"
      cancelText="No"
      title="Terminate the Statement?"
    >
      <Text>
        Terminating a statement ends the statement, returning an error to the
        session.
      </Text>
    </Modal>
  );
};

export default forwardRef(TerminateQueryModal);