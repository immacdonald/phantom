import React, { useEffect, useMemo, useState } from 'react';
import style from './FileUploadPortal.module.scss';
import { Cancel } from '../../../';
import { Button } from '../Button';

//import uploadFile from '../../../icons/upload_file.svg?url';

interface FileUploadPortalProps {
	maxFiles?: number;
	submit: (file: File[]) => void;
}

const FileUploadPortal: React.FC<FileUploadPortalProps> = ({ maxFiles = 4, submit }: FileUploadPortalProps) => {
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
	const [fileLimit, setFileLimit] = useState<boolean>(false);

	const handleUploadFiles = (files: File[]) => {
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

	const removeFile = (index: number) => {
		// Copy array to prevent state mutability issues
		const remaining = [...uploadedFiles];
		remaining.splice(index, 1);
		setUploadedFiles(remaining);
	};

	const handleFileEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
		const chosenFiles = Array.from(e.target.files || []);
		handleUploadFiles(chosenFiles);
	};

	const fileList = useMemo(() => {
		return uploadedFiles.map((file: File, i: number) => (
			<div key={file.name} className={style.fileLabel}>
				<Button Icon={Cancel} onClick={() => removeFile(i)} context="critical" rounded />
				<span>{file.name}</span>
			</div>
		));
	}, [uploadedFiles]);

	return (
		<div className={style.wrapper}>
			<div className={style.inputWrapper}>
				<input type="file" multiple onChange={handleFileEvent} disabled={fileLimit} style={{ "--v-icon": `url("${"./icons/upload_file.svg?url"}")` } as React.CSSProperties} />
				{uploadedFiles.length > 0 && <div className={style.fileList}>{fileList}</div>}
				{uploadedFiles.length > 0 && <div className={style.submit}>
					<Button onClick={() => submit(uploadedFiles)} disabled={!uploadedFiles.length} label="Upload Files" visual="filled" context="primary" />
				</div>}
			</div>
		</div>
	);
};

export { FileUploadPortal };
