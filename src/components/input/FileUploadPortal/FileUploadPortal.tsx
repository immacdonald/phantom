import { Callback } from '@types';
import { CSSProperties, ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { CancelIcon, UploadFileIcon } from '@assets/icons';
import { Button, Column } from '@components';
import style from './FileUploadPortal.module.scss';

interface FileUploadPortalProps {
    maxFiles?: number;
    submit: Callback<File[]>;
}

const FileUploadPortal: FC<FileUploadPortalProps> = ({ maxFiles = 4, submit }) => {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [fileLimit, setFileLimit] = useState<boolean>(false);

    const handleUploadFiles = (files: File[]): void => {
        const uploaded: File[] = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === maxFiles) {
                    setFileLimit(true);
                }
                if (uploaded.length > maxFiles) {
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

    const removeFile = (index: number): void => {
        // Copy array to prevent state mutability issues
        const remaining = [...uploadedFiles];
        remaining.splice(index, 1);
        setUploadedFiles(remaining);
    };

    const handleFileEvent = (e: ChangeEvent<HTMLInputElement>): void => {
        const chosenFiles = Array.from(e.target.files || []);
        handleUploadFiles(chosenFiles);
    };

    const fileList = useMemo(() => {
        return uploadedFiles.map((file: File, i: number) => (
            <div key={file.name} className={style.fileLabel}>
                <Button Icon={CancelIcon} onClick={() => removeFile(i)} context="critical" rounded />
                <span>{file.name}</span>
            </div>
        ));
    }, [uploadedFiles]);

    return (
        <div className={style.wrapper}>
            <div className={style.inputWrapper}>
                <input type="file" multiple onChange={handleFileEvent} disabled={fileLimit} style={{ '--v-icon': `url("${'./icons/upload_file.svg?url'}")` } as CSSProperties} />
                <div className={style.visual} />
                <UploadFileIcon context="primary" size="large" className={style.icon} />
            </div>
            {uploadedFiles.length > 0 && <div className={style.fileList}>{fileList}</div>}
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
