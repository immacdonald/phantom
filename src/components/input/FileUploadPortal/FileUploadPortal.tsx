import { Callback, CommonComponentProps } from '@types';
import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { CancelIcon, UploadFileIcon } from '@assets/icons';
import clsx from 'clsx';
import { Button, Column } from '@components';
import styles from './FileUploadPortal.module.scss';

interface FileUploadPortalProps extends CommonComponentProps<HTMLInputElement> {
    /** Maximum number of files allowed for upload. */
    maxFiles?: number;

    /** Callback function triggered when files are submitted. */
    submit: Callback<File[]>;

    /** Class for the file upload wrapper element. */
    wrapperClassName?: string;
}

/** A file upload portal component that allows multiple file uploads with validation and removal support. */
const FileUploadPortal: FC<FileUploadPortalProps> = ({ maxFiles = 4, submit, wrapperClassName, ...props }) => {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [fileLimit, setFileLimit] = useState<boolean>(false);
    const [showLimitWarning, setShowLimitWarning] = useState<boolean>(false);

    /** Handles new file uploads, ensuring they do not exceed the maximum file limit. */
    const handleUploadFiles = (files: File[]): void => {
        const uploaded: File[] = [...uploadedFiles];
        let limitExceeded = false;

        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === maxFiles) {
                    setFileLimit(true);
                }
                if (uploaded.length > maxFiles && !showLimitWarning) {
                    setShowLimitWarning(true);
                    alert(`You can only add a maximum of ${maxFiles} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
            return false;
        });

        if (!limitExceeded) {
            setUploadedFiles(uploaded);
        }
    };

    useEffect(() => {
        setFileLimit(uploadedFiles.length >= maxFiles);
    }, [uploadedFiles]);

    /** Removes a file from the upload list based on index. */
    const removeFile = (index: number): void => {
        setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    /** Processes file input changes and triggers file upload handling. */
    const handleFileEvent = (e: ChangeEvent<HTMLInputElement>): void => {
        const chosenFiles = Array.from(e.target.files || []);
        handleUploadFiles(chosenFiles);
    };

    /** Memoized list of uploaded files for rendering. */
    const fileList = useMemo(() => {
        return uploadedFiles.map((file: File, i: number) => (
            <div key={file.name} className={styles.fileLabel}>
                <Button Icon={CancelIcon} onClick={() => removeFile(i)} variant="text" context="critical" rounded />
                <span>{file.name}</span>
            </div>
        ));
    }, [uploadedFiles]);

    return (
        <div className={clsx(styles.wrapper, wrapperClassName)}>
            <div className={styles.inputWrapper}>
                <input type="file" multiple onChange={handleFileEvent} disabled={fileLimit} {...props} />
                <div className={styles.visual} />
                <UploadFileIcon context="primary" size="large" className={styles.icon} />
            </div>
            {uploadedFiles.length > 0 && <div className={styles.fileList}>{fileList}</div>}
            {uploadedFiles.length > 0 && (
                <Column>
                    <Button onClick={() => submit(uploadedFiles)} disabled={!uploadedFiles.length} type="primary">
                        Upload Files
                    </Button>
                </Column>
            )}
        </div>
    );
};

export { FileUploadPortal };
