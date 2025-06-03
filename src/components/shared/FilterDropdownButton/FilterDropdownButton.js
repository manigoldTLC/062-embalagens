'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './FilterDropdownButton.module.scss';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FilterDropdownButton = ({
	label,
	options,
	selectedValue,
	onValueChange,
	defaultLabel = "Todos"
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleOptionClick = (optionValue) => {
		onValueChange(optionValue);
		setIsOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const displayLabel = options.find(opt => opt.value === selectedValue)?.label || defaultLabel;

	return (
		<div className={styles.filterDropdown} ref={dropdownRef}>
			<button className={styles.dropdownButton} onClick={toggleDropdown} aria-haspopup="true" aria-expanded={isOpen}>
				<span>{label}: <strong>{displayLabel}</strong></span>
				{isOpen ? <FaChevronUp /> : <FaChevronDown />}
			</button>
			{isOpen && (
				<ul className={styles.dropdownMenu}>
					{options.find(opt => opt.value === "") && (
						<li
							key="all-option"
							className={selectedValue === "" ? styles.activeOption : ''}
							onClick={() => handleOptionClick("")}
						>
							{defaultLabel}
						</li>
					)}
					{options.filter(opt => opt.value !== "").map((option) => (
						<li
							key={option.value}
							className={selectedValue === option.value ? styles.activeOption : ''}
							onClick={() => handleOptionClick(option.value)}
						>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default FilterDropdownButton;